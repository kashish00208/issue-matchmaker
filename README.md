## What Is Dev Companion?

Dev Companion is an AI-powered chatbot that helps developers **finish their side projects** instead of starting new ones. It solves the common problem: too many unfinished projects, poor task breakdown, and forgetting where you left off.

---

## Core Problem It Solves

| Developer Pain Point | Dev Companion Solution |
|---------------------|----------------------|
| "I have 10 side projects started but 0 finished" | Helps prioritize and focus on ONE project at a time |
| "I don't know what to work on next" | Breaks big tasks into smallest actionable steps |
| "I forgot where I left off" | Tracks last worked date, reminds you to check in |
| "Scope creep - I keep adding features" | Helps define MVP, detects feature creep |

---


## Feature List

### Core Features

-  **Project Registry** - Add, edit, delete, track projects
-  **Task Breakdown** - AI breaks big tasks into smallest actionable steps
-  **Focus Mode** - Helps you focus on one project at a time
-  **Check-in System** - Reminds you of abandoned projects
-  **Status Tracking** - Active / Paused / Completed / Waiting

### Showcase Features (Bonus)

-  **Dashboard** - Visual overview of all projects
-  **Daily Standup** - "What will you work on today?"
-  **Scope Creep Detector** - Flags non-MVP features
-  **Progress Tracking** - See completion over time
-  **Notifications** - Remind to check in on projects

---

## How It Works (Technical)

### Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │ ───► │  API Routes  │ ───► │   Database   │
│  (Next.js)   │      │  (Node.js)   │      │  (SQLite)    │
└──────────────┘      └──────────────┘      └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  OpenAI API  │
                     │  (GPT-4)     │
                     └──────────────┘
```



```
Project {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "completed" | "waiting"
  lastWorkedOn: datetime
  createdAt: datetime
  updatedAt: datetime
}

Task {
  id: string
  projectId: string
  title: string
  isCompleted: boolean
  createdAt: datetime
}

Conversation {
  id: string
  projectId: string?
  messages: JSON
  createdAt: datetime
}
```

### Prompt Structure

```
System: You are DevBuddy, a developer companion AI.

Your goals:
1. Help developers FINISH projects, not start new ones
2. Break big tasks into smallest actionable steps
3. Check in on abandoned/paused projects
4. Keep focus on MVP (minimum viable product)
5. Be concise and action-oriented

Rules:
- Always ask clarifying questions
- Never let user create a new project without checking unfinished ones
- Break tasks into subtasks that can be done in 1-2 hours
- Use encouraging but direct tone
```

---

## User Interactions

| User Says | Dev Companion Responds |
|----------|----------------------|
| "I have a new idea" | "Let's check your active projects first" |
| "What should I work on?" | Shows prioritized list based on last worked |
| "I'm stuck" | "What's blocking? Let's break it down" |
| "I want to add a feature" | "Is that MVP? What problem does it solve?" |
| "I haven't worked on this in weeks" | "What's holding you back?" |

---

## Success Metrics

-  Reduced number of active side projects
-  More projects moved from "active" to "completed"
-  Faster task completion (focused sessions)
-  Reduced scope creep in projects

---

## Demo Scenarios

### Scenario 1: The Overwhelmed Developer

**User:** "I have 8 side projects. Help!"
**Dev Companion:** "That's a lot. Pick your top 3. We'll focus on finishing ONE at a time. Which matters most right now?"

### Scenario 2: The Scope Creepper

**User:** "I want to add dark mode, animations, and social sharing to my app"
**Dev Companion:** "That's v2. What's the ONE thing your app needs to be useful? Let's strip to MVP first."

### Scenario 3: The Returner

**User:** "I haven't worked on my app in 2 weeks"
**Dev Companion:** "Welcome back! You left off at adding user profiles. Want to jump back in or pick a different task?"


