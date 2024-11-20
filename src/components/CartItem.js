const CartItem = ({ item, deleteFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <h4>{item.name}</h4>
      <p>Cantidad: {item.quantity}</p>
      <p>${item.price * item.quantity}</p>
      <button onClick={() => deleteFromCart(item.id)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
