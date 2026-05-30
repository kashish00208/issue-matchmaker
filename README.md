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

## User Flow

### Flow 1: First Time Setup

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION                              SYSTEM RESPONSE │
├─────────────────────────────────────────────────────────────┤
│  1. Opens app for the first time         │
│                                           → Welcome screen │
│                                           → "Let's add your first project" │
│  2. Enters project name                  │
│     "Building a weather app"             → Validates input │
│  3. Adds description                     │
│     "React app showing local weather"   → Stores in DB     │
│  4. Selects status: Active / Paused      → Project created │
│                                           → "Great! What's the      │
│                                             next smallest step?"       │
└─────────────────────────────────────────────────────────────┘
```

### Flow 2: Daily Check-in

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION                              SYSTEM RESPONSE │
├─────────────────────────────────────────────────────────────┤
│  1. Opens Dev Companion                 │
│                                           → Shows dashboard │
│                                           → "Hey! You have 3 active      │
│                                             projects. Which one         │
│                                             should we work on today?" │
│  2. Selects project                      │
│     "Weather app"                       │ → Loads project details │
│                                           → Shows last task worked on │
│                                           → "You left off at 'add API   │
│                                             fetch function'.          │
│                                             What's the next step?"    │
│  3. Gets focused task                   │
│     "Create weather API service"        │ → Agent breaks into:         │
│                                           → "Let's break this into:    │
│                                             1. Get API key              │
│                                             2. Write fetch function    │
│                                             3. Add error handling"     │
│                                           → "Start with #1"           │
└─────────────────────────────────────────────────────────────┘
```

### Flow 3: Starting a New Project (The Intervention)

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION                              SYSTEM RESPONSE │
├─────────────────────────────────────────────────────────────┤
│  1. Says: "I want to start a new        │
│     project - a chess game"            │
│                                           → "I see you have 2 active   │
│                                             projects unfinished.      │
│                                             Are you sure?"           │
│  2. Still wants to start                │
│     "Yes but this one is different"    │
│                                           → "Let's check:             │
│                                             • What's the goal?       │
│                                             • MVP features?           │
│                                             • Why will this finish?"  │
│  3. Answers questions                   │ → Agent captures          │
│     "MVP: move pieces, check win"       │ → Agent adds as "v2" idea   │
│                                           → "OK, let's add it.       │
│                                             But finish Weather App   │
│                                             FIRST. Deal?"            │
│  4. Agrees                              │
│     "Deal"                             │ → Creates project          │
│                                           → Marks as "waiting"      │
│                                           → "Focus: Weather App"     │
└─────────────────────────────────────────────────────────────┘
```

### Flow 4: Abandoned Project Recovery

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION                              SYSTEM RESPONSE │
├─────────────────────────────────────────────────────────────┤
│  1. User hasn't opened app in 7 days     │
│                                           → PUSH NOTIFICATION        │
│                                           → "You haven't worked on   │
│                                             'Weather App' in 7 days │
│                                             What's blocking you?"   │
│  2. Responds: "Got stuck on API"         │
│                                           → "Need help?"             │
│  3. Asks for help                       │
│     "How do I handle API errors?"       │ → Provides guidance       │
│                                           → "Try this pattern..."    │
└─────────────────────────────────────────────────────────────┘
```

### Flow 5: Task Breakdown Session

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION                              SYSTEM RESPONSE │
├─────────────────────────────────────────────────────────────┤
│  1. Says: "I need to add user auth"      │
│                                           → "That's a big task.      │
│                                             Let's break it down."    │
│                                           → "What's the MVP auth?"  │
│  2. Answers                             │
│     "Email/password login"               │
│                                           → BREAKS INTO:            │
│                                           ┌─────────────────────┐   │
│                                           │ 1. Create user     │   │
│                                           │    model           │   │
│                                           │ 2. Add login form  │   │
│                                           │ 3. Add register   │   │
│                                           │    form           │   │
│                                           │ 4. Hash password  │   │
│                                           │ 5. Add session    │   │
│                                           │ 6. Protect routes │   │
│                                           └─────────────────────┘   │
│                                           → "Start with #1"         │
│                                           → Creates subtasks       │
└─────────────────────────────────────────────────────────────┘
```

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


