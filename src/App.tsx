import { Container, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./css/App.css";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Title order={1}>Gamehaven</Title>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
