export function repoVerdictPrompt(repoHealth: any, healthScore: any): string {
  return `
    Repo: ${repoHealth.name}
    Stars: ${repoHealth.stars}
    Avg merge time: ${healthScore.avgMergeTimeHours} hours
    Avg maintainer response: ${healthScore.avgResponseTimeHours} hours
    Verdict: ${healthScore.verdict}
  `.trim();
}