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
  const auth = Route.useRouteContext({
    select: ({ auth }) => auth,
  });
  const onSuccess = (login: string, access_token: string): void => {
    auth.signIn(login, access_token);
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
