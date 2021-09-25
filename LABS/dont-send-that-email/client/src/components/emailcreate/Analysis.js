import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import "./email.css";
const Analysis = ({ toneAnalysis, error }) => {
  let toneResult;
  const colors = {
    Joy: "joy",
    Anger: "danger",
    Fear: "warning",
    Sadness: "info",
    Confident: "success",
    Analytical: "primary",
    Tentative: "tentative"
  };
  // eslint-disable-next-line
  if (error == "Error: Request failed with status code 429") {
    toneResult = "Free users are capped at 100 email analyses.";
    // eslint-disable-next-line
  } else if (error == "Error: Request failed with status code 500") {
    toneResult = "The document does not have a tone to it.";
  } else if (toneAnalysis === null) {
    toneResult = "No analysis. Click the analyze button.";
  } else if (toneAnalysis && toneAnalysis.document_tone.tones.length) {
    toneResult = toneAnalysis.document_tone.tones.map((e, i) => {
      const color = colors[e.tone_name];
      const score = (e.score * 100).toFixed() + "%";
      return (
        <p key={i} className={`label-${color} tone`} style={{ width: score }}>
          {e.tone_id}: {score}
        </p>
      );
    });
  } else {
    toneResult = "The document does not have a tone to it.";
  }

  return (
    <Card className="no-transition">
      <CardHeader>Document Tone Analysis</CardHeader>
      <CardBody>{toneResult}</CardBody>
    </Card>
  );
};
export default Analysis;
