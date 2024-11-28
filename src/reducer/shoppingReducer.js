export const TYPES = {
  READ_STATE: "READ_STATE",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ONE_ITEM: "REMOVE_ONE_ITEM",
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
        cart: action.payload.cart,
      };

    case TYPES.ADD_TO_CART:
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].quantity += 1;
        updatedCart[itemIndex].totalPrice = updatedCart[itemIndex].quantity * updatedCart[itemIndex].price;
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }], // Agrega el nuevo producto al carrito
        };
      }

    case TYPES.REMOVE_ONE_ITEM:
      const cartItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (cartItemIndex >= 0) {
        const item = state.cart[cartItemIndex];
        const updatedCart = [...state.cart];

        // Si la cantidad es 1, eliminamos el artículo. Si es mayor a 1, simplemente la reducimos en 1
        if (item.quantity === 1) {
          updatedCart.splice(cartItemIndex, 1);
        } else {
          updatedCart[cartItemIndex].quantity -= 1;
          updatedCart[cartItemIndex].totalPrice = updatedCart[cartItemIndex].quantity * updatedCart[cartItemIndex].price;
        }

        return { ...state, cart: updatedCart };
      }

      return state;

    case TYPES.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id), // Eliminar un solo artículo
      };

    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: [], // Vaciamos el carrito
      };

    case TYPES.UPDATE_QUANTITY:
      const { id, quantity } = action.payload;
      const cartUpdateIndex = state.cart.findIndex((item) => item.id === id);

      if (cartUpdateIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[cartUpdateIndex].quantity = quantity;
        updatedCart[cartUpdateIndex].totalPrice = quantity * updatedCart[cartUpdateIndex].price;
        return { ...state, cart: updatedCart };
      }

      return state;

    default:
      return state;
  }
};
