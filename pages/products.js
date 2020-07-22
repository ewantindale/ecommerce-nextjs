import Head from "next/head";
import dbConnect from "../utils/dbConnect";
import Product from "../models/Product";
import Layout from "../components/Layout";
import { Card, Header, Image, Button, Label, Grid } from "semantic-ui-react";

function Products({ products }) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header size="huge">Products</Header>
      <Grid stackable columns={4}>
        {products.map((product) => (
          <Grid.Column key={product._id}>
            <Card>
              <Image src="/image.png" />
              <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Description>{product.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Label basic size="large">
                  {product.stock} in stock
                </Label>
                <Button positive floated="right" size="small">
                  Add to Cart
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const res = await Product.find({});
  const products = res.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    return product;
  });
  return {
    props: { products },
  };
}

export default Products;
