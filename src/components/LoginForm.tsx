import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type LoginFormProps = {
  onSuccess: (login: string, access_token: string) => void;
};

type SuccessResponse = {
  access_token: string;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidden, setHidden] = useState<"none" | "flex">("none");

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("login", login);
    data.append("password", password);
    try {
      const response = (await axios.postForm("/api/auth/login", data))
        .data as SuccessResponse;
      onSuccess(login, response.access_token);
    } catch {
      setHidden("flex");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        component="form"
        elevation={5}
        sx={{
          p: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" mb={1} align="center">
          Вход
        </Typography>
        <Stack spacing={3}>
          <Box
            height={40}
            bgcolor="red"
            borderRadius={1}
            sx={{
              display: hidden,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="white" variant="body1" align="center">
              Неверный логин или пароль
            </Typography>
          </Box>
          <TextField
            id="login"
            label="Логин"
            variant="outlined"
            onChange={handleLoginChange}
          />
          <TextField
            id="password"
            label="Пароль"
            variant="outlined"
            type="password"
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
