import { GoogleGenerativeAI } from "@google/generative-ai";

export class StarterPlanTool {
  private gemini: GoogleGenerativeAI;

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async run(issue: any, userProfile: { skills: string[]; hoursPerWeek: number }) {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are an OSS mentor. A developer wants to contribute to open source.
      
      Their skills: ${userProfile.skills.join(', ')}
      Hours available per week: ${userProfile.hoursPerWeek}
      
      Issue they want to solve:
      Title: ${issue.title}
      Description: ${issue.description?.slice(0, 300)}
      
      Write a short step-by-step starter plan (max 5 steps) for how they 
      should approach this issue. Be specific and practical.
      
      Return ONLY a JSON array like:
      [{ "step": 1, "action": "Clone the repo", "detail": "..." }]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();

    return JSON.parse(clean);
  }
}

export default StarterPlanTool;