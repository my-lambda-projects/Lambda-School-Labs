import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: "30%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
});

const InvoiceSummary = props => {
  const { classes } = props;

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography style={{ color: "#8bc34a" }} variant="h4" gutterBottom>
          Invoice Summary
        </Typography>
        <Grid container spacing={24} className={classes.gridTop}>
          <Grid item xs={6} sm={3}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Invoice #:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.number}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Date:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.date
                ? props.invoice.date
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Due Date:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.dueDate
                ? props.invoice.dueDate
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")
                : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.gridTop}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              From:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.phoneNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.address1}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.address2}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.company.city} {props.invoice.company.state}{" "}
              {props.invoice.company.zipCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Bill To:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.phoneNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.address1}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.address2}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.customer.city} {props.invoice.customer.state}{" "}
              {props.invoice.customer.zipCode}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.gridTop}>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Items:
            </Typography>
            {props.invoice.items
              ? props.invoice.items.map(item => {
                  return (
                    <React.Fragment>
                      <Typography variant="body1" gutterBottom>
                        {item.quantity} {item.name} {item.description}{" "}
                        {item.cost} {item.amount}
                      </Typography>
                    </React.Fragment>
                  );
                })
              : null}
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Subtotal:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.subtotal ? `$ ${props.invoice.subtotal}` : ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Discount:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.discount ? `$ ${props.invoice.discount}` : ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Shipping:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.shipping ? `$ ${props.invoice.shipping}` : ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Tax:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.tax ? `$ ${props.invoice.tax}` : ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#8bc34a" }} variant="h5" gutterBottom>
              Total:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.invoice.total ? `$ ${props.invoice.total}` : ""}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(InvoiceSummary);
