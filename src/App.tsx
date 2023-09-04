import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";

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
  ];

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
