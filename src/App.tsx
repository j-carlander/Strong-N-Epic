import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { AdminPage } from "./Pages/AdminPage";
import { WorkoutPage } from "./Pages/WorkoutPage";

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
  ];

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
