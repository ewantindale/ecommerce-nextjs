import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { Header, Loader, Button, Segment, Container } from "semantic-ui-react";
import ProductList from "../components/ProductList";
import useSWR, { mutate } from "swr";
import fetcher from "../utils/fetcher";
import AddProductModal from "../components/AddProductModal";
import { useSession } from "next-auth/client";

export default function Dashboard() {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/products", fetcher);

  const addProduct = async (product) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      mutate("/api/products", {
        ...data,
        products: [...data.products, product],
      });
    } catch (error) {
      console.log("error adding new product");
    }
  };

  const updateProduct = async (pid, product) => {
    try {
      await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      mutate("/api/products", {
        ...data,
        products: data.products.map((p) => (p._id === pid ? product : p)),
      });
    } catch (error) {
      console.log("error updating product", error);
    }
  };

  const removeProduct = async (pid) => {
    try {
      await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      mutate("/api/products", {
        ...data,
        products: data.products.filter((p) => p._id !== pid),
      });
    } catch (error) {
      console.log("error deleting product");
    }
  };

  if (loading)
    return (
      <Layout>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Loader active inline="centered" />
      </Layout>
    );

  if (!session)
    return (
      <Layout>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Segment textAlign="center">
          <Header>You must be signed in to access the Dashboard. </Header>
          <Link href="/api/auth/signin">
            <Button>Sign in</Button>
          </Link>
        </Segment>
      </Layout>
    );

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header size="huge">Dashboard</Header>

      <AddProductModal addProduct={addProduct} />
      <Header size="huge">Products</Header>

      {data ? (
        <ProductList
          products={data.products}
          removeProduct={removeProduct}
          updateProduct={updateProduct}
        />
      ) : error ? (
        <p>Error loading products</p>
      ) : (
        <Loader active inline="centered" />
      )}

      <Link href="/api/auth/signout">
        <Button>Sign Out</Button>
      </Link>
    </Layout>
  );
}
