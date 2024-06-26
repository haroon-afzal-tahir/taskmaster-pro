import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { publicRoutes } from './routes/route';
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  
  const theme = createTheme({
    palette: {
      primary: { main: '#63CB21' },
      secondary: { main: '#263238' }
    }
  });
      
  const router = createBrowserRouter(publicRoutes);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Toaster position="bottom-right"/>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App;
