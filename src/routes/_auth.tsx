import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar";
import { Box } from "@mui/material";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    if (context.auth.status === "loggedOut") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
}
