import { Header, Table, Button } from "semantic-ui-react";
import RemoveProductConfirm from "./RemoveProductConfirm";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductList({
  products,
  removeProduct,
  updateProduct,
}) {
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product._id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <UpdateProductModal
                  product={product}
                  updateProduct={updateProduct}
                />
                <RemoveProductConfirm
                  onConfirm={() => removeProduct(product._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
