export const TYPES = {
  READ_STATE: "READ_STATE",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_CART: "CLEAR_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

export const shoppingInitialState = {
  products: [],
  plans: [],
  cart: [],
};

export const shoppingReducer = (state, action) => {
  switch (action.type) {
    case TYPES.READ_STATE:
      return {
        ...state,
        products: action.payload.products,
        plans: action.payload.plans,
        cart: action.payload.cart.map((item) => ({
          ...item,
          totalPrice: item.price * (item.quantity || 1), // Aseguramos calcular el total al cargar
        })),
      };

    case TYPES.ADD_TO_CART: {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].quantity += 1;
        updatedCart[itemIndex].totalPrice =
          updatedCart[itemIndex].quantity * updatedCart[itemIndex].price;
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: 1, totalPrice: action.payload.price },
          ],
        };
      }
    }

    case TYPES.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id), // Eliminar producto por completo
      };

    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: [], // Vaciar el carrito
      };

    case TYPES.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const cartUpdateIndex = state.cart.findIndex((item) => item.id === id);

      if (cartUpdateIndex >= 0) {
        const updatedCart = [...state.cart];
        const item = updatedCart[cartUpdateIndex];
        item.quantity = quantity;
        item.totalPrice = quantity * item.price; // Recalcular total
        return { ...state, cart: updatedCart };
      }

      return state;
    }

    default:
      return state;
  }
};
