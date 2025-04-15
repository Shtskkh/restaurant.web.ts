import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm.tsx";
import { Container } from "@mui/material";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Вход" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { auth } = Route.useRouteContext();
  const onSuccess = (login: string, access_token: string): void => {
    auth.setUsername(login);
    auth.setAccessToken(access_token);
    auth.setIsAuthenticated(true);
    navigate({ to: "/dashboard", replace: true }).then();
  };
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LoginForm onSuccess={onSuccess} />
    </Container>
  );
}
