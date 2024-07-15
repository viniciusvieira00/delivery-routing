import HomeView from "@/sections/home-view";
import { Container, Typography } from "@mui/material";


export default function Home() {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <HomeView />

    </Container>
  );
}
