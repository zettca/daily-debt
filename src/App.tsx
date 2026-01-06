import { ChecklistCard } from "@/components/checklist-card";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

export function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <ChecklistCard />
      </div>
    </ThemeProvider>
  );
}
