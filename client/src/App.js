import { useEffect, useState } from "react";
import "./App.css";
import { findAll } from "./modules/properties/api";
import Property from "./modules/properties/components/Property";

function App() {
  const [properties, setProperties] = useState([]);

  const fetch = async () => {
    const properties = await findAll();
    setProperties(properties);
  };

  useEffect(() => {
    fetch();
  }, []);

  return properties.map((p) => <Property name={p.name} price={p.price} />);
}

export default App;
