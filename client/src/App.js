import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { BrowserRouter, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import { Route, Routes } from "react-router-dom";

import Layout from "scenes/layout";
import Dashboard  from "scenes/dashboard";
import Products from "scenes/products"





function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>

              <Route element={<Layout />}>  {/* Layout component will be the main parent for any route included below */}
                <Route path="/" element = {<Navigate to="/dashboard" replace />}  />  {/* Navigate component - will navigate to dashboard page if we land on default page */}
                <Route path="/dashboard" element={<Dashboard />}/>   {/* render dashboard */}
                <Route path="/products" element={<Products />} />
              </Route>

            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
