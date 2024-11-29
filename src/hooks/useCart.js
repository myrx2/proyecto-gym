import { useReducer, useEffect } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";

const useCart = () => {
  // useReducer maneja el estado del carrito utilizando un reducer.
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { cart, products, plans } = state;

  // Endpoints para realizar las solicitudes a la API.
  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    plans: "http://localhost:5000/plans",
    cart: "http://localhost:5000/cart",
  };

  // Función para cargar el estado inicial desde la API.
  const updateState = async () => {
    try {
      // Solicitudes para obtener los datos de productos, planes y carrito.
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responsePlans = await axios.get(ENDPOINTS.plans);
      const responseCart = await axios.get(ENDPOINTS.cart);

      // Actualizar el estado con los datos obtenidos.
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          plans: responsePlans.data,
          cart: responseCart.data,
        },
      });
    } catch (error) {
      console.error("Error fetching state:", error);
    }
  };

  // useEffect para cargar los datos iniciales cuando se monta el componente.
  useEffect(() => {
    updateState();
  }, []);

  // Agregar un producto al carrito.
  const addToCart = async (item) => {
    // Verificar si el producto ya está en el carrito.
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Si ya existe, aumentar su cantidad.
      const updatedQuantity = existingItem.quantity + 1;

      dispatch({
        type: TYPES.UPDATE_QUANTITY,
        payload: { id: existingItem.id, quantity: updatedQuantity },
      });

      try {
        // Actualizar la cantidad en el servidor.
        await axios.patch(`${ENDPOINTS.cart}/${existingItem.id}`, {
          quantity: updatedQuantity,
        });
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    } else {
      // Si no existe, agregarlo como un nuevo ítem.
      const newItem = { ...item, quantity: 1 };

      dispatch({
        type: TYPES.ADD_TO_CART,
        payload: newItem,
      });

      try {
        // Guardar el nuevo ítem en el servidor.
        await axios.post(ENDPOINTS.cart, newItem);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Eliminar un producto del carrito.
  const removeFromCart = async (id) => {
    dispatch({
      type: TYPES.REMOVE_ITEM,
      payload: { id },
    });
    await axios.delete(`${ENDPOINTS.cart}/${id}`);
  };

  // Reducir la cantidad de un producto en el carrito.
  const decreaseItemQuantity = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedQuantity = itemToUpdate.quantity - 1;

      if (updatedQuantity > 0) {
        // Si la cantidad es mayor a 0, actualizarla.
        dispatch({
          type: TYPES.UPDATE_QUANTITY,
          payload: { id: itemToUpdate.id, quantity: updatedQuantity },
        });

        await axios.put(`${ENDPOINTS.cart}/${itemToUpdate.id}`, {
          ...itemToUpdate,
          quantity: updatedQuantity,
          totalPrice: updatedQuantity * itemToUpdate.price,
        });
      } else {
        // Si la cantidad llega a 0, eliminar el ítem.
        await removeFromCart(id);
      }
    }
  };

  // Vaciar completamente el carrito.
  const clearCart = async () => {
    try {
      for (let item of cart) {
        // Eliminar cada ítem del carrito en el servidor.
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      dispatch({ type: TYPES.CLEAR_CART }); // Limpiar el carrito en el estado.
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Retornar las funciones y el estado necesario para usar el carrito.
  return {
    cart,
    products,
    plans,
    addToCart,
    removeFromCart,
    decreaseItemQuantity,
    clearCart,
  };
};

export default useCart;
