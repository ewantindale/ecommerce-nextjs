import React, { useState } from "react";
import { Button, Modal, Confirm } from "semantic-ui-react";

export default function RemoveProductConfirm({ onConfirm }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button negative onClick={handleOpen}>
        Remove
      </Button>
      <Confirm
        open={open}
        onCancel={handleClose}
        onConfirm={onConfirm}
        confirmButton={<Button negative>Yes, remove it</Button>}
        content="Are you sure you want to remove this product from the store?"
        header="Confirm Product Removal"
      />
    </>
  );
}
