import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { DailyGoalItem } from "../types";
import { formatDisplayDate } from "../utils";

export interface LogsDialogProps {
  todos: DailyGoalItem[];
}

export function LogsDialog({ todos }: LogsDialogProps) {
  const [open, setOpen] = useState(false);

  // Create a comprehensive log of all completed goals
  const completedLogs = todos
    .flatMap((goal) =>
      goal.completedDates.map((date) => ({
        goalId: goal.id,
        goalText: goal.text,
        date,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date descending

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <HistoryIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Goals Log
          </Typography>
          <Typography variant="body2" color="textSecondary">
            All recorded goal completions
          </Typography>
        </DialogTitle>
        <DialogContent>
          {completedLogs.length === 0 ? (
            <Typography color="textSecondary" className="text-center py-4">
              No completed goals yet. Start checking off your daily goals!
            </Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Goal Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedLogs.map((log) => (
                    <TableRow key={`${log.goalId}-${log.date}`}>
                      <TableCell>{formatDisplayDate(log.date)}</TableCell>
                      <TableCell>{log.goalText}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
