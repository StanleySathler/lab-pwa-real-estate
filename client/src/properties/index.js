import "./ui.css";

(async () => {
  const renderProperties = async () => {
    const fetch = async () => {
      const { data: properties } = await axios.get(
        `${process.env.API_URL}/properties`
      );

      return properties;
    };

    const buildRow = () => {
      const $root = document.createElement("div");
      $root.classList.add("row");

      return $root;
    };

    const buildCard = ({ name }) => {
      const $root = document.createElement("div");
      $root.classList.add("col", "s12", "m6", "l4");

      const $card = document.createElement("div");
      $card.classList.add("card", "blue-grey", "darken-1");

      const $header = document.createElement("div");
      $header.classList.add("card-content", "white-text");

      const $name = document.createElement("span");
      $name.classList.add("card-title");

      const $nameText = document.createTextNode(name);

      $name.append($nameText);
      $header.append($name);
      $card.append($header);
      $root.append($card);

      return $root;
    };

    const properties = await fetch();

    const $propertiesContainer = document.querySelector("#properties");
    const $wrapper = buildRow();

    properties.forEach((property) => {
      const $card = buildCard(property);
      $wrapper.append($card);
    });

    $propertiesContainer.append($wrapper);
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
