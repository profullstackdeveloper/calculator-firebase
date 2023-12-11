import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/utils/Center";
import PrivateRoute from "./components/utils/PrivateRoute";
import styled from 'styled-components';
import MasterLayout from "./components/layout/MasterLayout.component";
import UserContextProvider from "./context/userContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserContextProvider>
          <MasterLayout>
            <Routes>
              {routes.map((route, index) => (
                route.protected ?
                  <Route element={<PrivateRoute>
                    <route.component />
                  </PrivateRoute>} path={route.path} key={index} />
                  : <Route element={<route.component />} path={route.path} key={index} />
              ))}
            </Routes>
          </MasterLayout>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
