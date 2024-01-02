import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./css/App.css";

function App() {
  return (
    <>
      <Header />
      <Container size={"xl"} className="container-layout" p={0}>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
