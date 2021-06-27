export const render = ({ price, features, place, thumbnail, label }) => {
  /* <article class="property"> */
  const $root = document.createElement("article");
  $root.classList.add("property");

  /* <div class="property__photo"> */
  const $photoWrapper = document.createElement("div");
  $photoWrapper.classList.add("property__photo");

  /* <img> */
  const $photoImg = document.createElement("img");

  /* <div class="property__details"> */
  const $propertyDetails = document.createElement("div");
  $propertyDetails.classList.add("property__details");

  /* <div> */
  const $div = document.createElement("div");

  /* <header class="property__top"> */
  const $propertyTop = document.createElement("header");
  $propertyTop.classList.add("property__top");

  /* <div class="property__price"> */
  const $propertyPrice = document.createElement("div");
  $propertyPrice.classList.add("property__price");

  /* <div class="property__address"> */
  const $propertyAddress = document.createElement("div");
  $propertyAddress.classList.add("property__address");

  /* <div class="property__features"> */
  const $propertyFeatures = document.createElement("div");
  $propertyFeatures.classList.add("property__features");

  /* <footer class="property__footer"> */
  const $footer = document.createElement("footer");
  $footer.classList.add("property__footer");

  /* <a class="cat"> */
  const $showMore = document.createElement("a");
  $showMore.classList.add("cat");

  /* Fill content. */
  $propertyPrice.appendChild(document.createTextNode(price));
  $propertyAddress.appendChild(document.createTextNode(place));
  $propertyFeatures.appendChild(document.createTextNode(features));
  $photoImg.setAttribute("src", thumbnail);
  $showMore.appendChild(document.createTextNode(label));

  /* Attach DOM. */
  $root.appendChild($photoWrapper);
  $root.appendChild($propertyDetails);
  $photoWrapper.appendChild($photoImg);
  $propertyDetails.appendChild($div);
  $propertyDetails.appendChild($footer);
  $div.appendChild($propertyTop);
  $div.appendChild($propertyFeatures);
  $propertyTop.appendChild($propertyPrice);
  $propertyTop.appendChild($propertyAddress);
  $footer.appendChild($showMore);

  // $parent.appendChild($root);
  return $root;
};
