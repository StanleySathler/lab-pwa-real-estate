import Axios from "axios";
import PropertyCard from "../design-system/property-card";
import "./home.css";

(async () => {
  const renderProperties = async () => {
    const fetch = async () => {
      const { data: properties } = await Axios.get(
        `${process.env.API_URL}/properties`
      );

      return properties;
    };

    let properties = await fetch();
    properties = properties.concat(properties).concat(properties);

    const $propertiesContainer = document.querySelector("#properties-content");

    properties.forEach((property) => {
      const $propertyCard = PropertyCard.render({
        ...property,
        label: "Show more",
      });
      $propertiesContainer.appendChild($propertyCard);
    });
  };

  const renderConnectionMessage = async () => {
    const hasConnection = window.navigator.onLine;

    if (!hasConnection) {
      const $wrapper = document.createElement("div");
      $wrapper.classList.add("alert__no-connection");

      const $text = document.createTextNode(
        "You have no internet connection. The data you see may be outdated. Please connect to a network to see the most recent data."
      );

      $wrapper.appendChild($text);
      document.querySelector("#alerts").appendChild($wrapper);
    }
  };

  await renderProperties();
  renderConnectionMessage();
})();
