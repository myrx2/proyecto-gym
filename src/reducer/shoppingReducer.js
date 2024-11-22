import { TYPES } from "@/actions/actions";

export const shoppingReducer = (state, action) => {
  switch (action.type) {

    case TYPES.READ_STATE:
      return {
        ...state,
        cart: action.payload.cart,
        products: action.payload.products,
      };

    case TYPES.ADD_TO_CART: {
      const newItem = state.products.find(
        (product) => product.id === action.payload
      );

      if (!newItem) return state;

      const itemInCart = state.cart.find((item) => item.id === newItem.id);

      if (itemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === itemInCart.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...newItem, quantity: 1 }],
      };
    }

 
    case TYPES.REMOVE_ONE_ITEM: {
      const productToRemove = state.cart.find(
        (item) => item.id === action.payload
      );

      if (!productToRemove) return state;

      if (productToRemove.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case TYPES.UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) return state;

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case TYPES.CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
};
