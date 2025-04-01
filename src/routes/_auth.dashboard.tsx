import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";

export const Route = createFileRoute("/_auth/dashboard")({
  head: () => ({
    meta: [{ title: "Сводка" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Сводка</h1>
      <p>Здесь может быть ваш контент.</p>
    </Box>
  );
}
