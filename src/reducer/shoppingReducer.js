import { TYPES } from "@/actions/actions";

export const shoppingReducer = (state, action) => {
  switch (action.type) {
    case TYPES.READ_STATE:
      return {
        ...state,
        products: action.payload.products,
        cart: action.payload.cart
      };
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...state.products.find((product) => product.id === action.payload), quantity: 1 }]
      };
    case TYPES.REMOVE_ONE_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        )
      };
    case TYPES.REMOVE_ALL_ITEMS:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };
    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};
