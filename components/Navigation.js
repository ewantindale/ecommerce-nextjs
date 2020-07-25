import Link from "next/link";
import { Menu, Container, Button, Header } from "semantic-ui-react";

export default function Navigation() {
  return (
    <Menu borderless>
      <Container>
        <Menu.Item>
          <Header>ecommerce</Header>
        </Menu.Item>
        <Menu.Item>
          <Header></Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Link href="/">
            <Menu.Item>Home</Menu.Item>
          </Link>
          <Link href="/products">
            <Menu.Item>Store</Menu.Item>
          </Link>
          <Link href="/dashboard">
            <Menu.Item>Dashboard</Menu.Item>
          </Link>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
