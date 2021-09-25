import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import UserContext from "../../context/UserContext";

import { CreateItem } from "../../graphQL/mutations/items";

const ItemFormDialog = props => {
  const context = useContext(UserContext);
  const { company, updateData } = context;
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    quantity: "",
    cost: "",
    amount: ""
  });

  const { name, description, quantity, cost, amount } = formState;

  const handleSaveItem = async () => {
    const result = await CreateItem(
      {
        name,
        description,
        quantity,
        cost,
        amount
      },
      context.company._id,
      "_id"
    );
    // TODO
    // await context.getItems();
    setFormState({
      name: "",
      description: "",
      quantity: "",
      cost: "",
      amount: ""
    });
   await updateData(company._id);
    props.onClose();
  };

  const handleInputChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        maxWidth="xs"
        open={true}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            value={name}
            label="Name"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            value={description}
            label="Description"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            name="quantity"
            value={quantity}
            label="Quantity"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="cost"
            name="cost"
            value={cost}
            label="Cost"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="amount"
            name="amount"
            value={amount}
            label="Amount"
            type="text"
            fullWidth
            required
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemFormDialog;
