import React from "react";
import { connectAsync } from "iguazu";
import { queryAllMyData } from "../../actions";
// These are the builtin functions for iguazu
function MyContainer({ isLoading, loadedWithErrors, myData }) {
  if (isLoading()) {
    return <div>Loading...</div>;
  }

  if (loadedWithErrors()) {
    return <div>Oh no! Something went wrong</div>;
  }
  return myData;
}
function loadDataAsProps({ store, ownProps }) {
  const { dispatch } = store;
  // console.log('ownProps', ownProps.props.props.match.path)
  // const path = ownProps.props.props.match.path
  const path = "/"; // Use the actual path when it's created as needed
  //Have to pass props to Splitpane, then to Right Component (StudentDisplay), causing
  // the need for ownProps.props.props....
  console.log(ownProps);
  return {
    myData: () => dispatch(queryAllMyData(path))
    // updateNote: (obj, history) => dispatch(updateNote(obj, history))
  };
}
export default connectAsync({ loadDataAsProps })(MyContainer);
