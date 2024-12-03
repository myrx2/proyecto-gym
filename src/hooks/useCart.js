import { useReducer, useEffect } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";

const useCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { cart, products, plans } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    plans: "http://localhost:5000/plans",
    cart: "http://localhost:5000/cart",
  };

  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responsePlans = await axios.get(ENDPOINTS.plans);
      const responseCart = await axios.get(ENDPOINTS.cart);

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

  // Cargar el estado inicial cuando el componente se monta
  useEffect(() => {
    updateState();
  }, []);

  // Función para obtener el número total de productos únicos en el carrito
  const getTotalQuantity = () => {
    // Contar productos únicos en el carrito (sin importar la cantidad)
    const uniqueProducts = new Set(cart.map(item => item.id));
    return uniqueProducts.size; // Retorna la cantidad de productos únicos
  };

  // Función para agregar productos al carrito
  const addToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;

      dispatch({
        type: TYPES.UPDATE_QUANTITY,
        payload: { id: existingItem.id, quantity: updatedQuantity },
      });

      // Actualizar el carrito en el servidor
      try {
        await axios.patch(`${ENDPOINTS.cart}/${existingItem.id}`, { quantity: updatedQuantity });
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    } else {
      const newItem = { ...item, quantity: 1 };

      dispatch({
        type: TYPES.ADD_TO_CART,
        payload: newItem,
      });

      // Guardar el nuevo ítem en el servidor
      try {
        await axios.post(ENDPOINTS.cart, newItem);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (id) => {
    dispatch({ type: TYPES.REMOVE_ITEM, payload: { id } });
    try {
      await axios.delete(`${ENDPOINTS.cart}/${id}`);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Función para reducir la cantidad de un producto
  const decreaseItemQuantity = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedQuantity = itemToUpdate.quantity - 1;

      if (updatedQuantity > 0) {
        dispatch({
          type: TYPES.UPDATE_QUANTITY,
          payload: { id: itemToUpdate.id, quantity: updatedQuantity },
        });

        try {
          await axios.put(`${ENDPOINTS.cart}/${itemToUpdate.id}`, {
            ...itemToUpdate,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * itemToUpdate.price,
          });
        } catch (error) {
          console.error("Error updating item quantity:", error);
        }
      } else {
        await removeFromCart(id);
      }
    }
  };

  const clearCart = async () => {
    try {
      // Esperar a que todas las peticiones de eliminación se completen.
      await Promise.all(cart.map((item) => axios.delete(`${ENDPOINTS.cart}/${item.id}`)));
  
      // Vaciar el carrito en el estado local.
      dispatch({ type: TYPES.CLEAR_CART });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Sincronizar el estado del carrito en tiempo real sin tener que recargar
  useEffect(() => {
    if (cart.length > 0) {
      updateState();  // Esto actualizará el carrito cuando se cambien los productos.
    }
  }, [cart]); // Este useEffect se ejecutará cuando el carrito cambie

  return {
    cart,
    products,
    plans,
    addToCart,
    removeFromCart,
    decreaseItemQuantity,
    clearCart,
    getTotalQuantity,
  };
};

export default useCart;
