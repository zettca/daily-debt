export interface GoalItem {
  id: number;
  text: string;
}

export interface DailyGoalItem extends GoalItem {
  completedDates: string[]; // Array of ISO date strings (YYYY-MM-DD)
}
