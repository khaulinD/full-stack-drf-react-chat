import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";
import { AuthServiceProvider } from "./context/AuthContext.tsx";
import TestLogin from "./pages/TestLogin.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <ToggleColorMode>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <Server />
                </ProtectedRoute>
              }
            />
            <Route path="category/:categoryName" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToggleColorMode>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
