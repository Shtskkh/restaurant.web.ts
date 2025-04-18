import { createRouter, RouterProvider } from "@tanstack/react-router";
import { CssBaseline } from "@mui/material";
import { routeTree } from "./routeTree.gen.ts";
import { authStore } from "./contexts/auth.ts";

const router = createRouter({ routeTree, context: { auth: undefined! } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = authStore();
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} context={{ auth }} />
    </>
  );
}

export default App;
