import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { GoalItem } from "../types";

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
    setEditingTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog} size="small">
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Configure Daily Goals
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Add, remove, or rename your daily goals.
          </Typography>
        </DialogTitle>
        <DialogContent className="grid gap-2">
          {editingTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-1">
              <TextField
                fullWidth
                size="small"
                value={todo.text}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
              />
              <IconButton
                onClick={() => handleRemoveTodo(todo.id)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <TextField
              fullWidth
              size="small"
              placeholder="Enter new goal..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
            />
            <IconButton onClick={handleAddTodo} color="primary" size="small">
              <AddIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
