import { useState } from 'react';
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

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const routes: Route[] = [
    {
      path: "/",
      element: <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
    },
    {
      path: "/admin",
      element: <AdminPage loggedIn={loggedIn}/>,
    },
    {
      path: "/workout",
      element: <WorkoutPage loggedIn={loggedIn}/>,
    },
  ];

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
