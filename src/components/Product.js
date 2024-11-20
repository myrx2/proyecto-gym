const Product = ({ product, addToCart }) => {
    return (
      <div className="product">
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
      </div>
    );
  };
  
  export default Product;
  