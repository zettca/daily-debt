import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const getNextTheme = (current: string) => {
  if (current === "system") return "light";
  if (current === "light") return "dark";
  return "system";
};

export function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Tooltip title={`${mode} mode`}>
      <IconButton onClick={() => setMode(getNextTheme(mode || "system"))}>
        {mode === "light" && <LightModeIcon />}
        {mode === "dark" && <DarkModeIcon />}
        {mode === "system" && <ComputerIcon />}
      </IconButton>
    </Tooltip>
  );
}
