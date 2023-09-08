import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { AdminPage } from "./Pages/AdminPage";
import { WorkoutPage } from "./Pages/WorkoutPage";
import { LoginPage } from "./Pages/LoginPage";
import { RegistrationPage } from "./Pages/RegistrationPage";
import { ContextProvider } from "./Context/contextProvider";

type Route = {
  path: string;
  element: JSX.Element;
};

function App() {

  const routes: Route[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/workout",
      element: <WorkoutPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />
    },
  ];

  return (
    <>
      <ContextProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ContextProvider>
    </>
  );
}

export default App;
