import { useState } from "react";
import { Plus, Settings, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GoalItem } from "@/types";

export interface ConfigureDialogProps {
  initialTodos: GoalItem[];
  onSave: (todos: GoalItem[]) => void;
}

export function ConfigureDialog({
  initialTodos,
  onSave,
}: ConfigureDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingTodos, setEditingTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const handleOpenDialog = () => {
    setEditingTodos(initialTodos);
    setOpen(true);
  };

  const handleSave = () => {
    onSave(editingTodos);
    setOpen(false);
  };

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;

    const maxId = Math.max(...editingTodos.map((t) => t.id), 0);
    setEditingTodos([
      ...editingTodos,
      { id: maxId + 1, text: newTodoText.trim() },
    ]);
    setNewTodoText("");
  };

  const handleRemoveTodo = (id: number) => {
    setEditingTodos(editingTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: number, text: string) => {
    setEditingTodos(
      editingTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        onClick={handleOpenDialog}
        render={
          <Button variant="outline" size="icon">
            <Settings className="size-5" />
          </Button>
        }
      />
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Configure Daily Goals</AlertDialogTitle>
          <AlertDialogDescription>
            Add, remove, or rename your daily goals.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2">
          {editingTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2">
              <Input
                value={todo.text}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter new goal..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleAddTodo} size="icon" variant="default">
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
