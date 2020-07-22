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
    </Layout>
  );
}
