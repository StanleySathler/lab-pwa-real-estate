/**
 * Service Worker.
 */
window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const sw = await navigator.serviceWorker.register("../sw.js");
      console.log("Service worker registered! 😎", sw);
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  }
});

/**
 * App.
 */
(async () => {
  const fetch = async () => {
    const { data: properties } = await axios.get(
      "https://lab-pwa-real-estate.herokuapp.com/properties"
    );

    return properties;
  };

  const render = (properties) => {
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

    const $propertiesContainer = document.querySelector("#properties");
    const $wrapper = buildRow();

    properties.forEach((property) => {
      const $card = buildCard(property);
      $wrapper.append($card);
    });

    $propertiesContainer.append($wrapper);
  };

  const properties = await fetch();
  render(properties);
})();
