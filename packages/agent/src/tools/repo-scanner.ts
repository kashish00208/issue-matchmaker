export class RepoScannerTool {
    private gitlabToken:string;
    constructor(){
        this.gitlabToken = process.env.GITLAB_TOKEN ||''
    }
    async run(repoUrl:string){
        const path = repoUrl.replace('https://gitlab.com/','');
        const encodedPath = encodeURIComponent(path);

        const baseUrl = `https://gitlab.com/api/v4/projects/${encodedPath}`;
        const headers = {'PRIVATE_TOKEN':this.gitlabToken};

        const [issueRes,repoRes] = await Promise.all([
            fetch(`${baseUrl}/issues?state=opened&lables=good+first+issue&per_page=20`,{headers}),
            fetch(baseUrl,{headers})
        ])

        const issues = await issueRes.json();
        const repo = await repoRes.json();

        const repoHealth = {
            name:repo.name,
            stars:repo.star_count,
            forks:repo.forks_count,
            lastActivity:repo.last_activity_at,
            openIssuesCount:repo.predominant_language,
        };
        return {issues,repoHealth}
    }

}

export default RepoScannerTool;