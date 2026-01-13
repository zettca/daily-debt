import { orange } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChecklistCard } from "./components/checklist-card";
import { ModeToggle } from "./components/mode-toggle";

const muiTheme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: orange[700] },
      },
    },
    dark: {
      palette: {
        primary: { main: orange[400] },
      },
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        className="min-h-screen flex items-center justify-center"
      >
        <ChecklistCard />
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </Container>
    </ThemeProvider>
  );
}
