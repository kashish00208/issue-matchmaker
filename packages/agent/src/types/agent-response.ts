export interface AgentResponse {
  verdict:string,
  repoHealth: {
    name: string;
    stars: number;
    avgMergeTimeHours: number;
    avgResponseTimeHours: number;
    verdict: string;
  };
  issues: {
    iid: number;
    title: string;
    score: number;
    reason: string;
    url: string;
  }[];
  starterPlan: {
    step: number;
    action: string;
    detail: string;
  }[];
}