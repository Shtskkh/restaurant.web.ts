import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";

export const Route = createFileRoute("/_auth/dashboard")({
  head: () => ({
    meta: [{ title: "Сводка" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h4"
        color="textPrimary"
        mt={3}
        mb={3}
        sx={{ fontWeight: "bold" }}
      >
        Сводка
      </Typography>
    </Box>
  );
}
