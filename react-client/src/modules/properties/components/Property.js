import "./Property.css";

const Property = ({ name, price }) => {
  return (
    <article className="property">
      <header>
        <h4>{name}</h4>
        <strong>Price: R${price}</strong>
      </header>
    </article>
  );
};

export default Property;
