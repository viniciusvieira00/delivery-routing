import Login from "@/sections/login-view";
import { Container } from "@mui/material";


export default function LoginPage() {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Login />

    </Container>
  );
}
