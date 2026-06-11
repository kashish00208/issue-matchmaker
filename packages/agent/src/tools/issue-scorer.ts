import { GoogleGenerativeAI } from '@google/generative-ai';

export class IssueScorerTool {
  private gemini: GoogleGenerativeAI;

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async run(issues: any[], userProfile: { skills: string[]; hoursPerWeek: number }) {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are an OSS mentor. Given these GitHub issues and a user's profile, 
      score each issue from 1-10 based on how suitable it is for this user.

      User skills: ${userProfile.skills.join(', ')}
      Hours available per week: ${userProfile.hoursPerWeek}

      Issues:
      ${issues.map((i, idx) => `${idx + 1}. [${i.iid}] ${i.title} — ${i.description?.slice(0, 100)}`).join('\n')}

      Return ONLY a JSON array like:
      [{ "iid": 1, "score": 8, "reason": "..." }]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, '').trim();
    const scores = JSON.parse(clean);

    return issues
      .map(issue => ({
        ...issue,
        score: scores.find((s: any) => s.iid === issue.iid)?.score || 0,
        reason: scores.find((s: any) => s.iid === issue.iid)?.reason || '',
      }))
      .sort((a, b) => b.score - a.score);
  }
}