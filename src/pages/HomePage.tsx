import { Title } from "@mantine/core";
import { useEffect } from "react";
import marioTest from "../api/axiosClient";

function HomePage() {
  useEffect(() => {
    marioTest();
  }, []);

  return <Title order={2}>Homepage</Title>;
}

export default HomePage;
