import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import confetti from "canvas-confetti";
import { useLocalStorage } from "usehooks-ts";
import type { DailyGoalItem } from "../types";
import { ConfigureDialog } from "./settings";

const defaultTodos: DailyGoalItem[] = [
  { id: 1, text: "Review pull requests", completed: false },
  { id: 2, text: "Update project documentation", completed: false },
  { id: 3, text: "Plan next sprint", completed: false },
];

export function ChecklistCard() {
  const [todos, setTodos] = useLocalStorage("daily-goals", defaultTodos);

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      if (newTodos.every((todo) => todo.completed)) {
        confetti();
      }

      return newTodos;
    });
  };

  // Sort todos: uncompleted first, completed at the end
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader
        title="Daily Goals"
        action={
          <ConfigureDialog
            initialTodos={todos}
            onSave={(newTodos) => {
              setTodos(newTodos.map((todo) => ({ ...todo, completed: false })));
            }}
          />
        }
      />
      <CardContent>
        <div className="grid gap-1 text-lg">
          {sortedTodos.map((todo) => (
            <FormControlLabel
              key={todo.id}
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              }
              label={todo.text}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
