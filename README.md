issue-matchmaker/
├── packages/
│   ├── agent/               # Google Cloud Agent Builder integration
│   │   ├── src/
│   │   │   ├── index.ts     # Agent orchestrator entry point
│   │   │   ├── tools/
│   │   │   │   ├── repo-scanner.ts      # MCP calls: list issues, get repo health
│   │   │   │   ├── issue-scorer.ts      # AI prompt: score issues against user
│   │   │   │   ├── health-indexer.ts    # Calc: merge time, maintainer response
│   │   │   │   └── starter-plan.ts      # Generate step-by-step walkthrough
│   │   │   ├── prompts/
│   │   │   │   ├── scoring.prompt.ts    # "You are an OSS mentor..." prompt
│   │   │   │   └── repo-verdict.prompt.ts
│   │   │   ├── types/
│   │   │   │   ├── issue.ts             # Issue, IssueScore, RepoHealth
│   │   │   │   ├── user-profile.ts      # Skills, time, goal
│   │   │   │   └── agent-response.ts    # What agent returns
│   │   │   └── utils/
│   │   │       ├── gitlab-mcp.ts        # GitLab MCP client setup
│   │   │       ├── gemini-client.ts     # Call Gemini API for scoring
│   │   │       └── cache.ts             # Cache repo health (6-12 hrs)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/                 # Express/Next.js API routes
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── onboard.ts           # POST /api/onboard → user profile
│   │   │   │   ├── analyze-repo.ts      # POST /api/analyze → repo verdict + issues
│   │   │   │   ├── issue-detail.ts      # GET /api/issue/:id → starter plan
│   │   │   │   └── health.ts            # GET /api/health (for testing)
│   │   │   ├── middleware/
│   │   │   │   ├── validate-input.ts
│   │   │   │   └── error-handler.ts
│   │   │   ├── index.ts                 # Express app setup
│   │   │   └── config.ts                # Env: GEMINI_API_KEY, GITLAB_MCP_URL
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                 # Next.js frontend
│       ├── app/
│       │   ├── page.tsx               # Landing / onboard form
│       │   ├── layout.tsx
│       │   ├── repo-verdict/
│       │   │   └── page.tsx           # Repo health + go/no-go
│       │   ├── issues/
│       │   │   └── [issueId]/
│       │   │       └── page.tsx       # Issue detail + starter plan
│       │   └── api/                   # API routes that call /api package
│       │       ├── onboard.ts
│       │       ├── analyze.ts
│       │       └── issue.ts
│       ├── components/
│       │   ├── ProfileForm.tsx
│       │   ├── RepoVerdict.tsx
│       │   ├── IssueCard.tsx
│       │   ├── StarterPlan.tsx
│       │   └── HealthBadge.tsx
│       ├── hooks/
│       │   ├── useAgent.ts            # Call agent, manage loading/error
│       │   └── useProfile.ts          # Persist user skills locally
│       ├── types/
│       │   └── index.ts               # Shared types
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
│
├── .env.example              # GEMINI_API_KEY, GITLAB_MCP_URL, GCP_PROJECT_ID
├── .gitignore
├── package.json              # Root monorepo config (yarn/pnpm workspaces)
├── tsconfig.json             # Root TypeScript config
├── LICENSE                   # MIT or Apache 2.0
└── README.md