import React, { useState, useEffect } from "react";

import locations from "../api/assets";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async searchTerm => {
    try {
      const response = await locations.get("/locations", {
        params: {
          //   description: put stuff in me,
          //   name: "box"
        }
      });
      setResults(response.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    searchApi("Locker");
  }, []);

  return [searchApi, results, errorMessage];
};
