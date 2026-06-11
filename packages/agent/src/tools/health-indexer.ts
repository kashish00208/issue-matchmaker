export class HealthIndexerTool {
    private gitlabToken: string;
    constructor() {
        this.gitlabToken = process.env.GITLAB_TOKEN || ''
    }
    async run(repoUrl: string) {
        const path = repoUrl.replace('https://gitlab.com/', '');
        const encodedPath = encodeURIComponent(path);

        const baseUrl = `https://gitlab.com/api/v4/projects/${encodedPath}`;
        const headers = { 'PRIVATE_TOKEN': this.gitlabToken };

        const issuesRes = await fetch(`${baseUrl}/issues?state=opened&per_page=20`, { headers });
        const issues = await issuesRes.json();

        const responseTimes = await Promise.all(
            issues.slice(0, 10).map(async (issue: any) => {
                const notesRes = await fetch(`${baseUrl}/issues/${issue.iid}/notes?sort=asc&per_page=1`, { headers });
                const notes = await notesRes.json();
                if (!notes[0]) return null;
                const opened = new Date(issue.created_at).getTime();
                const firstReply = new Date(notes[0].created_at).getTime();
                return firstReply - opened;
            })
        );

        const validTimes = responseTimes.filter(Boolean) as number[];
        const avgResponseHours = Math.round(
            validTimes.reduce((a, b) => a + b, 0) / validTimes.length / (1000 * 60 * 60)
        );
        return {
            avgMergetimeHors:validTimes,
            avgResponseTimeHours: avgResponseHours,
            verdict: avgResponseHours < 24 ? 'Active maintainer' : 'Slow maintainer'
        };

    }
}

export default HealthIndexerTool;