import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { ILogin } from "@interfaces/index";

const loginSchema = z.object({
  email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido").toLowerCase(),
  password: z.string().nonempty("Campo obrigatório"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function LoginUser(data: ILogin) {
    await api.login.login(data);
    navigate("/home");
  }

  return (
    <Grid
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      marginTop="2rem"
    >
      <Typography variant="h4" fontWeight="600">
        Login
      </Typography>
      <Card
        elevation={9}
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "3em auto",
          padding: "1rem",
        }}
      >
        <form onSubmit={handleSubmit(LoginUser)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Grid display="flex" flexDirection="column" gap="1rem" sx={{ height: "50%" }}>
            <TextField
              label="Email"
              size="small"
              fullWidth
              error={!!errors.email}
              helperText={errors ? errors.email?.message : ""}
              {...register("email")}
            />
            <TextField
              label="Senha"
              size="small"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors ? errors.password?.message : ""}
              {...register("password")}
            />
          </Grid>
          <Grid display="flex" flexDirection="column" gap="0.75rem" width="80%" margin="0 auto">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate("/register")}>
              Cadastro
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
