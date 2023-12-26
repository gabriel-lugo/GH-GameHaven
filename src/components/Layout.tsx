import { Container, ContainerProps } from "@mantine/core";
import { ReactNode } from "react";

interface LayoutProps extends ContainerProps {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <Container
      {...props}
      style={{
        ...props.style,
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#FCF5E5",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
