import axios from "axios";

export default axios.create({
  baseURL: "https://net-giver-asset-mngr.herokuapp.com/api"
});
