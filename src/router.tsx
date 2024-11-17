import { createBrowserRouter } from "react-router-dom";
import RootRoute, { loader as rootLoader } from "./routes/root";
import LoginRoute, { action as loginAction} from "./routes/login";
import JobsRoute, { loader as jobsLoader } from "./routes/jobs";
import { action as logoutAction } from "./routes/logout";
import { loader as indexLoader } from "./routes/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    loader: rootLoader,
    children: [
      {
        errorElement: "error element child",
        children: [
          {
              index: true,
              loader: indexLoader,
          },
          {
              path: "jobs",
              element: <JobsRoute />,
              loader: jobsLoader,
          },
          {
              path: "logout",
              element: <JobsRoute />,
              action: logoutAction,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginRoute />,
    action: loginAction,
  }
]);