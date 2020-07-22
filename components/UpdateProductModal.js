import { useState, useEffect } from "react";
import { Form, Button, Modal, Message } from "semantic-ui-react";

export default function UpdateProductModal({ product, updateProduct }) {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock,
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorMsg(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProductClick = () => {
    if (!validateForm()) {
      return;
    }

    const newProduct = {
      name: form.name,
      description: form.description,
      stock: form.stock,
    };

    updateProduct(product._id, newProduct);
    setErrorMsg(null);

    setOpen(false);
  };

  const validateForm = () => {
    if (!form.name) {
      setErrorMsg("Please enter a product name");
      return false;
    }
    if (!form.description) {
      setErrorMsg("Please enter a product description");
      return false;
    }
    if (form.stock === "" || form.stock < 0) {
      setErrorMsg("Please enter a valid stock amount");
      return false;
    }
    return true;
  };

  return (
    <Modal
      trigger={<Button onClick={handleOpen}>Update</Button>}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>Update product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Product Name"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={form.name}
          />
          <Form.TextArea
            label="Product Description"
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            value={form.description}
          />
          <Form.Input
            label="Stock"
            name="stock"
            onChange={handleChange}
            type="number"
            width="5"
            value={form.stock}
          />
          {errorMsg ? <Message negative>{errorMsg}</Message> : null}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button primary onClick={handleUpdateProductClick}>
          Update Product
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
