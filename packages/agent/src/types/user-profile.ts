export interface UserProfile {
  skills: string[];
  hoursPerWeek: number;
  goal?: string; // optional: "learn", "resume", "fun"
}