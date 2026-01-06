export interface GoalItem {
  id: number;
  text: string;
}

export interface DailyGoalItem extends GoalItem {
  completed: boolean;
}
