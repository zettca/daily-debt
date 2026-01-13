import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import confetti from "canvas-confetti";
import { useLocalStorage } from "usehooks-ts";
import type { DailyGoalItem } from "../types";
import { ConfigureDialog } from "./settings";

const defaultTodos: DailyGoalItem[] = [
  { id: 1, text: "Review pull requests", completedDates: [] },
  { id: 2, text: "Update project documentation", completedDates: [] },
  { id: 3, text: "Plan next sprint", completedDates: [] },
];

const chipDateFormat = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
});

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getDateDaysAgo(daysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

function formatDisplayDate(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (formatDate(date) === formatDate(today)) {
    return "Today";
  } else if (formatDate(date) === formatDate(yesterday)) {
    return "Yesterday";
  } else {
    return chipDateFormat.format(date);
  }
}

export function ChecklistCard() {
  const [todos, setTodos] = useLocalStorage("daily-goals", defaultTodos);
  const today = formatDate(new Date());

  const toggleDate = (goalId: number, dateString: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((goal) => {
        if (goal.id !== goalId) return goal;

        const isCompleted = goal.completedDates.includes(dateString);
        const completedDates = isCompleted
          ? goal.completedDates.filter((d) => d !== dateString)
          : [...goal.completedDates, dateString];
        return { ...goal, completedDates };
      });

      // Check if all goals are completed for today
      if (newTodos.every((goal) => goal.completedDates.includes(today))) {
        confetti();
      }

      return newTodos;
    });
  };

  // Get uncompleted dates for a goal (up to 7 days back)
  const getUncompletedDates = (goal: DailyGoalItem): string[] => {
    const uncompleted: string[] = [];
    for (let i = 1; i <= 7; i++) {
      const date = getDateDaysAgo(i);
      if (!goal.completedDates.includes(date)) {
        uncompleted.push(date);
      }
    }
    return uncompleted;
  };

  // Sort todos: incomplete for today first
  const sortedTodos = [...todos].sort((a, b) => {
    const aCompletedToday = a.completedDates.includes(today);
    const bCompletedToday = b.completedDates.includes(today);
    if (aCompletedToday === bCompletedToday) return 0;
    return aCompletedToday ? 1 : -1;
  });

  return (
    <div className="w-full">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h4" component="h1">
          Daily Goals
        </Typography>
        <ConfigureDialog
          initialTodos={todos}
          onSave={(newTodos) => {
            setTodos(
              newTodos.map((todo) => ({
                ...todo,
                completedDates:
                  todos.find((t) => t.id === todo.id)?.completedDates || [],
              })),
            );
          }}
        />
      </Box>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedTodos.map((goal) => {
          const isCompletedToday = goal.completedDates.includes(today);
          const uncompletedDates = getUncompletedDates(goal);

          return (
            <Card
              key={goal.id}
              className="transition-all"
              sx={{
                opacity: isCompletedToday ? 0.7 : 1,
                borderLeft: isCompletedToday ? "4px solid" : "none",
                borderColor: "success.main",
              }}
            >
              <CardHeader
                title={
                  <FormControlLabel
                    label={goal.text}
                    control={
                      <Checkbox
                        checked={isCompletedToday}
                        onChange={() => toggleDate(goal.id, today)}
                        color="primary"
                      />
                    }
                  />
                }
              />
              <CardContent className="space-y-2">
                {uncompletedDates.length > 0 && (
                  <>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      className="block mt-2 mb-1"
                    >
                      Missed days:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {uncompletedDates.map((date) => (
                        <Chip
                          key={date}
                          label={formatDisplayDate(date)}
                          onClick={() => toggleDate(goal.id, date)}
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
