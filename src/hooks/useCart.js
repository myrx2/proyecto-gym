import { useReducer, useEffect } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";

const useCart = () => {
  // Inicializa el estado con useReducer utilizando el reducer y el estado inicial
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { cart, products, plans } = state;

  // Definición de los endpoints a los que se hará la solicitud para obtener productos, planes y el carrito
  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    plans: "http://localhost:5000/plans",
    cart: "http://localhost:5000/cart",
  };

  // Función para actualizar el estado con la información desde la API
  const updateState = async () => {
    try {
      // Realiza solicitudes GET a la API para obtener los productos, planes y carrito
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responsePlans = await axios.get(ENDPOINTS.plans);
      const responseCart = await axios.get(ENDPOINTS.cart);

      // Despacha una acción para actualizar el estado con los datos obtenidos
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

  // useEffect que carga el estado inicial cuando el componente se monta
  useEffect(() => {
    updateState();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para obtener la cantidad total de productos únicos en el carrito
  const getTotalQuantity = () => {
    // Crea un Set para contar productos únicos basados en su ID
    const uniqueProducts = new Set(cart.map(item => item.id));
    return uniqueProducts.size; // Retorna la cantidad de productos únicos
  };

  // Función para agregar productos al carrito
  const addToCart = async (item) => {
    // Verifica si el producto ya está en el carrito
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Si el producto ya está, incrementa su cantidad en 1
      const updatedQuantity = existingItem.quantity + 1;

      dispatch({
        type: TYPES.UPDATE_QUANTITY,
        payload: { id: existingItem.id, quantity: updatedQuantity },
      });

      // Actualiza el carrito en el servidor
      try {
        await axios.patch(`${ENDPOINTS.cart}/${existingItem.id}`, { quantity: updatedQuantity });
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    } else {
      // Si el producto no está en el carrito, lo agrega con una cantidad de 1
      const newItem = { ...item, quantity: 1 };

      dispatch({
        type: TYPES.ADD_TO_CART,
        payload: newItem,
      });

      // Agrega el nuevo ítem al carrito en el servidor
      try {
        await axios.post(ENDPOINTS.cart, newItem);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (id) => {
    // Despacha una acción para eliminar el producto del carrito
    dispatch({ type: TYPES.REMOVE_ITEM, payload: { id } });
    
    // Elimina el producto en el servidor
    try {
      await axios.delete(`${ENDPOINTS.cart}/${id}`);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Función para reducir la cantidad de un producto en el carrito
  const decreaseItemQuantity = async (id) => {
    // Encuentra el producto en el carrito
    const itemToUpdate = cart.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedQuantity = itemToUpdate.quantity - 1;

      if (updatedQuantity > 0) {
        // Si la cantidad es mayor a 1, actualiza la cantidad en el estado y en el servidor
        dispatch({
          type: TYPES.UPDATE_QUANTITY,
          payload: { id: itemToUpdate.id, quantity: updatedQuantity },
        });

        try {
          await axios.put(`${ENDPOINTS.cart}/${itemToUpdate.id}`, {
            ...itemToUpdate,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * itemToUpdate.price, // Actualiza el precio total del producto
          });
        } catch (error) {
          console.error("Error updating item quantity:", error);
        }
      } else {
        // Si la cantidad llega a 0, elimina el producto del carrito
        await removeFromCart(id);
      }
    }
  };

  // Función para vaciar el carrito
  const clearCart = async () => {
    try {
      // Elimina todos los productos del carrito en el servidor
      await Promise.all(cart.map((item) => axios.delete(`${ENDPOINTS.cart}/${item.id}`)));
  
      // Vacía el carrito en el estado local
      dispatch({ type: TYPES.CLEAR_CART });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // useEffect para sincronizar el estado del carrito cuando cambian los productos del carrito
  useEffect(() => {
    if (cart.length > 0) {
      updateState();  // Vuelve a actualizar el estado del carrito si cambian los productos
    }
  }, [cart]); // Este efecto se ejecutará cada vez que cambie el carrito

  // Devuelve funciones y datos que pueden ser usados en otros componentes
  return {
    cart,  // El carrito actual
    products,  // Los productos disponibles
    plans,  // Los planes disponibles
    getTotalQuantity,  // Función para obtener la cantidad total de productos únicos en el carrito/contador
    addToCart,  // Función para agregar productos al carrito
    removeFromCart,  // Función para eliminar productos del carrito
    decreaseItemQuantity,  // Función para reducir la cantidad de un producto
    clearCart,  // Función para vaciar el carrito
  };
};

export default useCart;
