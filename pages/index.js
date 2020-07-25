import Head from "next/head";
import Layout from "../components/Layout";
import { Header } from "semantic-ui-react";

export default function Dashboard() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Welcome to the ecommerce platform</Header>
      <p>
        Visit the Store page to view a list of products from a customers
        perspective.
      </p>
      <p>
        Authenticated users can add, update and remove products as an
        administrator using the Dashboard.
      </p>
      <p>For now, authentication is just a GitHub sign in.</p>
    </Layout>
  );
}
