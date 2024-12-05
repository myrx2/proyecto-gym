import { useReducer, useEffect } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";

const useCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);  // Usamos useReducer para manejar el estado del carrito.

  const { cart, products, plans } = state;  // Desestructuramos el estado para obtener el carrito, productos y planes.

  const ENDPOINTS = {
    products: "http://localhost:5000/products",  // Endpoint para obtener los productos.
    plans: "http://localhost:5000/plans",  // Endpoint para obtener los planes.
    cart: "http://localhost:5000/cart",  // Endpoint para obtener el carrito.
  };

  // Función que actualiza el estado del carrito, productos y planes a partir de la API.
  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);  // Obtener productos.
      const responsePlans = await axios.get(ENDPOINTS.plans);  // Obtener planes.
      const responseCart = await axios.get(ENDPOINTS.cart);  // Obtener carrito.

      // Despachamos una acción para actualizar el estado con los datos obtenidos.
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          plans: responsePlans.data,
          cart: responseCart.data,
        },
      });
    } catch (error) {
      console.error("Error fetching state:", error);  // Manejo de errores si falla la obtención de datos.
    }
  };

  // useEffect para actualizar el estado cuando el componente se monte por primera vez.
  useEffect(() => {
    updateState();  // Llamar a la función updateState cuando el componente se monta.
  }, []);

  // Función para calcular el total del carrito sumando el precio de todos los productos en el carrito.
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);  // Suma el precio de todos los ítems multiplicado por su cantidad.
  };

  // Función para obtener la cantidad total de productos únicos en el carrito.
  const getTotalQuantity = () => {
    const uniqueProducts = new Set(cart.map(item => item.id));  // Usamos un Set para asegurarnos de contar productos únicos.
    return uniqueProducts.size;  // Devuelve la cantidad de productos únicos.
  };

  // Función para añadir un producto al carrito.
  const addToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);  // Verificar si el ítem ya está en el carrito.

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;  // Si el ítem existe, incrementamos la cantidad.

      // Despachamos una acción para actualizar la cantidad del ítem en el carrito.
      dispatch({
        type: TYPES.UPDATE_QUANTITY,
        payload: { id: existingItem.id, quantity: updatedQuantity },
      });

      try {
        await axios.patch(`${ENDPOINTS.cart}/${existingItem.id}`, { quantity: updatedQuantity });  // Actualizar la cantidad en la API.
      } catch (error) {
        console.error("Error updating item quantity:", error);  // Manejo de errores si falla la actualización.
      }
    } else {
      const newItem = { ...item, quantity: 1 };  // Si el ítem no está en el carrito, lo añadimos con cantidad 1.

      // Despachamos una acción para agregar el nuevo ítem al carrito.
      dispatch({
        type: TYPES.ADD_TO_CART,
        payload: newItem,
      });

      try {
        await axios.post(ENDPOINTS.cart, newItem);  // Añadir el nuevo ítem en la API.
      } catch (error) {
        console.error("Error adding item to cart:", error);  // Manejo de errores si falla la adición.
      }
    }
  };

  // Función para eliminar un ítem del carrito.
  const removeFromCart = async (id) => {
    dispatch({ type: TYPES.REMOVE_ITEM, payload: { id } });  // Despachamos una acción para eliminar el ítem del carrito.

    try {
      await axios.delete(`${ENDPOINTS.cart}/${id}`);  // Eliminamos el ítem en la API.
    } catch (error) {
      console.error("Error removing item:", error);  
    }
  };

  // Función para disminuir la cantidad de un ítem en el carrito.
  const decreaseItemQuantity = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);  

    if (itemToUpdate) {
      const updatedQuantity = itemToUpdate.quantity - 1;  // Reducir la cantidad.

      if (updatedQuantity > 0) {
        // Si la cantidad es mayor a 0, actualizamos la cantidad.
        dispatch({
          type: TYPES.UPDATE_QUANTITY,
          payload: { id: itemToUpdate.id, quantity: updatedQuantity },
        });

        try {
          await axios.put(`${ENDPOINTS.cart}/${itemToUpdate.id}`, {  // Actualizar la cantidad en la API.
            ...itemToUpdate,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * itemToUpdate.price,
          });
        } catch (error) {
          console.error("Error updating item quantity:", error);  // Manejo de errores si falla la actualización.
        }
      } else {
        await removeFromCart(id);  // Si la cantidad es 0 o menos, eliminamos el ítem del carrito.
      }
    }
  };

  // Función para vaciar el carrito.
  const clearCart = async () => {
    try {
      // Usamos Promise.all para eliminar todos los ítems del carrito de la API en paralelo.
      await Promise.all(cart.map((item) => axios.delete(`${ENDPOINTS.cart}/${item.id}`)));
      dispatch({ type: TYPES.CLEAR_CART });  // Despachamos una acción para vaciar el carrito en el estado.
    } catch (error) {
      console.error("Error clearing cart:", error);  // Manejo de errores si falla el vaciado.
    }
  };

  // useEffect para actualizar el estado cuando cambie el carrito.
  useEffect(() => {
    if (cart.length > 0) {
      updateState();  // Actualizamos el estado cuando el carrito cambie.
    }
  }, [cart]);

  return {
    cart,
    products,
    plans,
    addToCart,
    removeFromCart,
    decreaseItemQuantity,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
  };
};

export default useCart;
