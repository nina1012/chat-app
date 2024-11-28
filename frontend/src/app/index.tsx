import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

import { createRouter } from "./pages";

export const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};
