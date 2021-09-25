import React from "react";
import { StudentInformationTabLabels as label } from "./StudentInformationTabLabels";
import { TextDiv, Label } from '../../mainStyle/styledComponent';

const StudentInformationTabCategory = ({category, value, colspan}) => {

    let colspanStyle = {};

    if (colspan > 1)
        { colspanStyle={ gridColumn: "span " + colspan }; }

    if (value === "")
        { value = "N/A"; }

    return (
        <div style={colspanStyle}>
            <Label>{label[category]}</Label>
            <TextDiv>{value}</TextDiv>
        </div>
    )
}

export default StudentInformationTabCategory;