import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const getNextTheme = (current: string) => {
  if (current === "system") return "light";
  if (current === "light") return "dark";
  return "system";
};

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`${theme} mode`}
      onClick={() => setTheme(getNextTheme(theme))}
    >
      {theme === "light" && <Sun className="size-5" />}
      {theme === "dark" && <Moon className="size-5" />}
      {theme === "system" && <Monitor className="size-5" />}
    </Button>
  );
}
