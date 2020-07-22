import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Modal,
  Message,
  Image,
  Segment,
} from "semantic-ui-react";

export default function UpdateProductModal({ product, updateProduct }) {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [form, setForm] = useState({
    image: product.image,
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

    updateProduct(product._id, form);
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
    if (form.price === "" || form.price < 0) {
      setErrorMsg("Please enter a valid price");
      return false;
    }
    return true;
  };

  const uploadFile = async (e) => {
    console.log("Uploading...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ecommerce");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgnjcfkk9/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setForm({ ...form, image: file.secure_url });
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
          <Segment>
            {form.image && (
              <Image size="small" src={form.image} alt="Upload Preview" />
            )}
            <Form.Input
              label="Product Image"
              type="file"
              id="file"
              name="file"
              placeholder="Upload Image"
              required
              onChange={uploadFile}
            />
          </Segment>

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
            label="Price (£)"
            name="price"
            onChange={handleChange}
            type="number"
            width="5"
            value={form.price}
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
