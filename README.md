# 🔍 Issue Matchmaker

> An AI-powered agent that matches open source contributors to the right GitLab issues based on their skills, availability, and repo health — powered by Gemini and Google Cloud Agent Builder.

---

## 🚀 Live Demo

🌐 **[https://issue-matchmaker.vercel.app/](https://issue-matchmaker.vercel.app/)**

---

## 🧠 What It Does

Most developers want to contribute to open source but don't know where to start. Issue Matchmaker solves this by:

1. Taking a **GitLab repo URL** and a **user's skills + availability**
2. Fetching all open `good first issues` from the repo via GitLab API
3. Analyzing **repo health** — average merge time, maintainer response rate
4. Using **Gemini AI** to score each issue against the user's profile
5. Returning the **top 5 best-fit issues** with a step-by-step starter plan

---

## 🏗️ Architecture

```
issue-matchmaker/
├── packages/
│   ├── agent/                          # Google Cloud Agent Builder integration
│   │   └── src/
│   │       ├── index.ts                # Agent orchestrator entry point
│   │       ├── tools/
│   │       │   ├── repo-scanner.ts     # GitLab API: fetch issues + repo health
│   │       │   ├── issue-scorer.ts     # Gemini AI: score issues against user profile
│   │       │   ├── health-indexer.ts   # Calc: avg merge time, maintainer response
│   │       │   └── starter-plan.ts     # Gemini AI: generate step-by-step walkthrough
│   │       ├── prompts/
│   │       │   ├── scoring.prompt.ts   # "You are an OSS mentor..." prompt
│   │       │   └── repo-verdict.prompt.ts
│   │       ├── types/
│   │       │   ├── issue.ts            # Issue, IssueScore, RepoHealth types
│   │       │   ├── user-profile.ts     # Skills, time, goal
│   │       │   └── agent-response.ts   # What the agent returns
│   │       └── utils/
│   │           ├── gitlab-mcp.ts       # GitLab MCP client setup
│   │           ├── gemini-client.ts    # Gemini API client
│   │           └── cache.ts            # Cache repo health (6–12 hrs)
│   ├── api/                            # REST API layer
│   └── web/                            # Frontend demo (Next.js)
├── .npmrc
├── package.json
└── pnpm-workspace.yaml
```

---

## 🔄 Agent Flow

```
User Input (repo URL + skills + hours/week)
        │
        ▼
RepoScannerTool ──► GitLab API
  - Fetch open issues (good first issue label)
  - Fetch repo metadata
        │
        ▼
HealthIndexerTool
  - Avg merge time (from merged MRs)
  - Avg maintainer response time (first comment on issues)
  - Verdict: "Active" / "Slow" maintainer
        │
        ▼
IssueScorerTool ──► Gemini Pro
  - Score each issue 1–10 against user skills
  - Rank by fit
        │
        ▼
StarterPlanTool ──► Gemini Pro
  - Generate 5-step contribution plan for top issue
        │
        ▼
AgentResponse
  - Top 5 matched issues with scores + reasons
  - Repo health verdict
  - Step-by-step starter plan
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Agent Runtime | Google Cloud Agent Builder |
| AI Scoring | Gemini Pro (`gemini-pro`) |
| Repo Data | GitLab REST API v4 |
| Frontend | Next.js 14 + Tailwind CSS |
| Deployment | Vercel |
| Package Manager | pnpm workspaces |
| Language | TypeScript |

---

## ⚙️ Local Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- GitLab Personal Access Token (`read_api`, `read_user` scopes)
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone the repo

```bash
git clone https://github.com/your-username/issue-matchmaker.git
cd issue-matchmaker
pnpm install
```

### 2. Set environment variables

Create a `.env.local` file in `packages/web/`:

```env
GITLAB_TOKEN=your_gitlab_personal_access_token
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run the demo locally

```bash
cd packages/web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `GITLAB_TOKEN` | GitLab Personal Access Token | gitlab.com → Settings → Access Tokens |
| `GEMINI_API_KEY` | Google Gemini API Key | makersuite.google.com |

---


## 🧩 Key Design Decisions

**Why GitLab over GitHub?** GitLab's API exposes merge request diffs and maintainer response data without rate limiting on self-hosted instances, making repo health analysis more accurate.

**Why Gemini for scoring?** The task requires nuanced understanding of issue complexity vs. user skill level — a reasoning model outperforms keyword matching significantly here.

**Why cache repo health?** Merge time and response rate don't change minute-to-minute. Caching for 6–12 hours cuts API calls and makes the agent faster on repeated queries for popular repos.

---

## 🗺️ Roadmap

- [ ] GitHub support
- [ ] User auth + saved profiles
- [ ] Weekly digest email of new matched issues
- [ ] VS Code extension
- [ ] Slack bot integration

---

## 👤 Author

Built by **Kashish** for the Google Cloud Agent Builder Hackathon.

---

