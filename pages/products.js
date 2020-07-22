import Head from "next/head";
import dbConnect from "../utils/dbConnect";
import Product from "../models/Product";
import Layout from "../components/Layout";
import {
  Card,
  Header,
  Image,
  Button,
  Label,
  Grid,
  Icon,
} from "semantic-ui-react";

function Products({ products }) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header size="huge">Products</Header>
      <Grid stackable columns={4}>
        {!products || products.length < 1 ? (
          <p>No products to display</p>
        ) : (
          products.map((product) => (
            <Grid.Column key={product._id}>
              <Card>
                <Image src={product.image} />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Description>{product.description}</Card.Description>
                </Card.Content>
                <Card.Content textAlign="center">
                  <Label
                    basic
                    size="large"
                    color={product.stock > 0 ? "green" : "red"}
                  >
                    {product.stock > 0
                      ? product.stock + " in stock"
                      : "Out of stock"}
                  </Label>
                </Card.Content>
                <Card.Content extra textAlign="center">
                  <Button
                    as="div"
                    labelPosition="left"
                    onClick={() => alert("add to cart button clicked")}
                  >
                    <Label basic pointing="right">
                      <Icon name="pound" />
                      {product.price}
                    </Label>
                    <Button primary>
                      <Icon name="cart" />
                      Add to Cart
                    </Button>
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))
        )}
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
