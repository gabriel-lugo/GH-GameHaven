import { Container, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./css/App.css";

function App() {
  return (
    <>
      <Header />
      <Container size={"xl"} className="container-layout">
        <main>
          <Title order={1}>Gamehaven</Title>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
