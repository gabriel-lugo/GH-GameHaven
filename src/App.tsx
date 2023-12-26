import { Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import "./css/App.css";

function App() {
  return (
    <>
      {/* <Flex> */}
      <Header />
      <Layout className="container-layout">
        <main>
          <Title order={1}>Gamehaven</Title>
          <Outlet />
        </main>
      </Layout>
      {/* </Flex> */}
    </>
  );
}

export default App;
