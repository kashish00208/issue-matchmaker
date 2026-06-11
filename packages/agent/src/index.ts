import RepoScannerTool from "./tools/repo-scanner";
import IssueScorerTool from "./tools/issue-scorer";
import HealthIndexerTool from "./tools/health-indexer";
import StarterPlanTool from "./tools/starter-plan";
import type UserProfile from "./types/user-profile";

// Agent Initialization 

export async function initAgent() {
  const repoScanner = new RepoScannerTool();   // MCP: list issues, repo health
  const issueScorer = new IssueScorerTool();   // AI: score issues vs user
  const healthIndexer = new HealthIndexerTool(); // Calc: merge time, response
  const starterPlan = new StarterPlanTool();   // Generate walkthrough

  return { repoScanner, issueScorer, healthIndexer, starterPlan };
}

// Main Orchestrator

export async function runAgent(
  repoUrl: string,
  userProfile: UserProfile
): Promise<AgentResponse> {

  const { repoScanner, issueScorer, healthIndexer, starterPlan } = 
    await initAgent();

  // Step 1: Fetch repo issues + health via MCP/GitLab
  const { issues, repoHealth } = await repoScanner.run(repoUrl);

  // Step 2: Index health metrics (merge time, maintainer response)
  const healthScore = await healthIndexer.run(repoHealth);

  // Step 3: Score each issue against user profile (skills, time, goal)
  const scoredIssues = await issueScorer.run(issues, userProfile, scoringPrompt);

  // Step 4: Generate step-by-step starter plan for top issue
  const topIssue = scoredIssues[0];
  const plan = await starterPlan.run(topIssue, repoHealth);

  // Step 5: Build final agent response
  return {
    repoVerdict: repoVerdictPrompt(repoHealth, healthScore),
    recommendedIssues: scoredIssues.slice(0, 5),
    starterPlan: plan,
    healthScore,
  };
}

// Google Cloud Agent Builder Handler

export async function agentHandler(req: any, res: any) {
  try {
    const { repoUrl, userProfile } = req.body;

    if (!repoUrl || !userProfile) {
      return res.status(400).json({ error: 'repoUrl and userProfile required' });
    }

    const result = await runAgent(repoUrl, userProfile);
    return res.status(200).json(result);

  } catch (err) {
    console.error('[Agent Error]', err);
    return res.status(500).json({ error: 'Agent failed', details: err });
  }
}