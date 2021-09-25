import React, { Component, Fragment } from "react";
import jsPDF from "jspdf";

let he = require("he");

console.log("PDF PROPS", this.props);
class Pdf extends Component {
  printDocument() {
    var x = window.open();
    const input = document.getElementById("divToPrint");
    const pdf = new jsPDF();
    pdf.fromHTML(input);
    var string = pdf.output("dataurlstring");

    var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }
  printBlanks() {
    var x = window.open();
    const input = document.getElementById("divToPrint");
    const rDivs = input.childNodes;
    console.log("RDIVS", rDivs);
    var nodesArray = Array.prototype.slice.call(rDivs);
    console.log("NODE ARRAY", nodesArray);

    const pdf = new jsPDF();

    nodesArray.forEach((item, index) => {
      if (item.localName === "div") {
        console.log(item);
        pdf.rect(10,10,20,20);
      }
    });

    for (let i=1, y=10;i < nodesArray.length; i++){
      if(nodesArray[i].localName === "div"){
        pdf.rect(10,y, 20, 20 )
        y += 10;
      }
    }
    var string = pdf.output("dataurlstring");

  

    var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    // pdf.fromHTML(input);

    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

  render() {
    return (
      <div>
        <button onClick={this.printDocument}>Print</button>
        <button onClick={this.printBlanks}>Print Blanks</button>
      </div>
    );
  }
}

export default Pdf;