import Navigation from "./Navigation";
import { Container } from "semantic-ui-react";

function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
