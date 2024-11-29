import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginUI } from "./pages/LoginUser";
import { TicketsUI } from "./pages/Tickets";
import { CalendarUI } from "./pages/Calendar";
import { WelcomeUI } from "./pages/Welcome";
import { AppointmentUI } from "./pages/Appointment";
import { TechnicianUI } from "./pages/Technician";
import { NotFoundPageUI } from "./pages/NotFoundPage";
import { ProfileUI } from "./pages/Profile";
import { useContext } from "react";

import UserContext from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <main className="flex">
        {user && <Navbar />}
        <section className="w-full h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-neutral-900 text-neutral-300">
          <Routes>
            <Route
              index
              element={
                !user ? <LoginUI /> : <WelcomeUI />
              }
            />
            <Route
              path="/login"
              element={
                !user ? <LoginUI /> : <WelcomeUI />
              }
            />

            <Route path="/logout" element={<LoginUI />} />

            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="/welcome" element={<WelcomeUI />} />
              <Route path="/tickets" element={<TicketsUI />} />
              <Route path="/calendar" element={<CalendarUI />} />
              <Route path="/profile" element={<ProfileUI />} />
            </Route>

            <Route
              path="/appointment"
              element={
                <ProtectedRoute
                  isAllowed={!!user/*  && user.permission.includes("tech") */}
                  redirectTo="/welcome"
                >
                  <AppointmentUI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technician"
              element={
                <ProtectedRoute
                  isAllowed={!!user && user.role == "Admin"}
                  redirectTo="/welcome"
                >
                  <TechnicianUI />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPageUI />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
