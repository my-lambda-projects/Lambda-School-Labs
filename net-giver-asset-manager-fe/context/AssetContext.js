import react, { useState, createContext } from 'react';
import axios from 'axios';

export const AssetContext = createContext();

export const assetProvider = () => {
  const [assets, setAssets] = useState([]);


  console.log("all data", assets)

  useEffect(() => {
    fetchAllAssets();
  }, []);

  // Fetches all assets upon rendering regardless of user
  const fetchAllAssets = () => {
    axios
      .get("https://net-giver-asset-mngr.herokuapp.com/api/assets")
      .then(response => {

        setHistory(response.data);

      })
      .catch(error => {
        console.log(error);
      });
  };




  return (
    <AssetContext.Provider>
      {props.children}
    </AssetContext.Provider>
  )
}