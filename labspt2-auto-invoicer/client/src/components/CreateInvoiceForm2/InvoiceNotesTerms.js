import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    [`@media (max-width: 600px)`]: {
      width: 380
    }
  }
});

const StyledSection = styled.section`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InvoiceNotesTerms = props => {
  return props.invoiceNotesTermsItems.map((val, idx) => {
    let notesId = `notes-${idx}`,
      termsId = `terms-${idx}`;

    const { classes } = props;
    return (
      <React.Fragment key={idx}>
        <StyledSection>
          <TextField
            label="Notes"
            multiline
            rowsMax="5"
            name={notesId}
            data-id={idx}
            value={props.invoiceNotesTermsItems[idx].name}
            className={classes.textField}
            InputProps={{ style: { fontSize: 14 } }}
            margin="normal"
          />

          <TextField
            label="Terms"
            multiline
            rowsMax="5"
            name={termsId}
            data-id={idx}
            value={props.invoiceNotesTermsItems[idx].name}
            className={classes.textField}
            InputProps={{ style: { fontSize: 14 } }}
            margin="normal"
          />
        </StyledSection>
      </React.Fragment>
    );
  });
};

export default withStyles(styles)(InvoiceNotesTerms);
