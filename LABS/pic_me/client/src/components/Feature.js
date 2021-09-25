import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
// import { Link } from "react-router-dom"

class Feature extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1 className="display-4">Welcome to PicMe</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, a metus ac eros, sodales eget per eget
              amet eu, dapibus dolor commodo magnis. Porttitor eros arcu. Magna
              nunc, amet blandit lacinia orci eget eu quisque, massa egestas
              aliquam pulvinar dui, semper urna nostra facilisis a ultricies,
              libero amet turpis. Velit vel cras in. Porta quam senectus, duis
              quis ultrices felis magna ac, ac ridiculus est massa ligula sint
              donec. Etiam eget at neque. Mauris tristique penatibus placerat
              sed eu sit, turpis porta aut erat ac, sagittis asperiores
              vestibulum magna dolor enim lorem. Id fusce libero, pede est in
              rhoncus ligula purus, feugiat ipsum hac est rutrum amet, justo
              neque eget ipsum condimentum vitae lorem, aliquam nec cum odio in
              proin. Pede aut pede quam velit, id mattis. Sapien ante amet, sed
              nam etiam, duis hac.
            </p>
            <hr className="my-2" />
          </div>
        </Jumbotron>
      </div>
    );
  }
}
export default Feature;
