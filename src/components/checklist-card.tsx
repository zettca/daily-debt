import confetti from "canvas-confetti";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { DailyGoalItem } from "@/types";
import { ConfigureDialog } from "./configure-dialog";

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
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Goals</CardTitle>
          <ConfigureDialog
            initialTodos={todos}
            onSave={(newTodos) => {
              setTodos(newTodos.map((todo) => ({ ...todo, completed: false })));
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1 text-lg">
          {sortedTodos.map((todo) => (
            <label
              key={todo.id}
              className="flex items-center gap-2 p-2 rounded-lg [&:hover,&:focus-within]:bg-primary/20 cursor-pointer"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span
                className={clsx("flex-1", {
                  "opacity-40 line-through": todo.completed,
                })}
              >
                {todo.text}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
