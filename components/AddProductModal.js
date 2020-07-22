import { useState } from "react";
import { Form, Button, Modal, Message } from "semantic-ui-react";

export default function AddProductModal({ addProduct }) {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", stock: 0 });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorMsg(null);
    setForm({ name: "", description: "", stock: 0 });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProductClick = () => {
    if (!validateForm()) {
      return;
    }

    const product = {
      name: form.name,
      description: form.description,
      stock: form.stock,
    };

    addProduct(product);

    setForm({ name: "", description: "", stock: 0 });
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
      trigger={
        <Button onClick={handleOpen} primary>
          Add New Product
        </Button>
      }
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>Add a new product</Modal.Header>
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
        <Button primary onClick={handleAddProductClick}>
          Add Product
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
