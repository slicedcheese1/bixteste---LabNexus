import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { IInitialRegistration } from "@interfaces/index";

const initialRegistrationSchema = z
  .object({
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .transform(name => {
        return name
          .trim()
          .split(" ")
          .map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Digite sua senha"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "As senhas são diferentes",
    path: ["confirmPassword"],
  });

type CreateUserFormData = z.infer<typeof initialRegistrationSchema>;

export function InitialRegistration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(initialRegistrationSchema),
  });

  async function LoginUser(data: IInitialRegistration) {
    await api.user.createUser(data);
    navigate("/login");
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
        Preencha seus dados:
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
              label="Nome"
              size="small"
              fullWidth
              error={!!errors.name}
              helperText={errors ? errors.name?.message : ""}
              {...register("name")}
            />
            <TextField
              label="Email"
              size="small"
              fullWidth
              error={!!errors.email}
              helperText={errors ? errors.email?.message : ""}
              {...register("email")}
            />
            <TextField
              type="password"
              label="Senha"
              size="small"
              fullWidth
              error={!!errors.password}
              helperText={errors ? errors.password?.message : ""}
              {...register("password")}
            />
            <TextField
              type="password"
              label="Confirme sua senha"
              size="small"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors ? errors.confirmPassword?.message : ""}
              {...register("confirmPassword")}
            />
          </Grid>
          <Grid display="flex" flexDirection="column" gap="0.75rem" width="80%" margin="0 auto">
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
              Voltar
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
