import {createRouter, RouterProvider} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {useMemo} from "react";
import {routeTree} from "./routeTree.gen.ts";

function App() {
  // Create a new router instance
  const router = useMemo(() => {
    return createRouter(
        {
          routeTree,
          scrollRestoration: true,
          defaultPendingMs: 0,
          defaultPendingMinMs: 300
        }
    );
  }, []);

  return (
      <>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
      </>
  )
}

export default App
