export const TYPES = {
  READ_STATE: "READ_STATE", // Cargar el estado inicial (productos, planes, y carrito) desde la API.
  ADD_TO_CART: "ADD_TO_CART", // Agregar un producto o plan al carrito.
  REMOVE_ITEM: "REMOVE_ITEM", // Eliminar un producto específico del carrito.
  CLEAR_CART: "CLEAR_CART", // Vaciar el carrito por completo.
  UPDATE_QUANTITY: "UPDATE_QUANTITY", // Actualizar la cantidad de un producto en el carrito.
};

// Estado inicial del carrito
export const shoppingInitialState = {
  products: [], 
  plans: [], 
  cart: [],  
};

// Reducer para manejar las acciones del carrito
export const shoppingReducer = (state, action) => {
  switch (action.type) {
    // Manejar la carga inicial de productos, planes y carrito.
    case TYPES.READ_STATE:
      return {
        ...state, // Retener el estado existente.
        products: action.payload.products, // Actualizar productos desde la API.
        plans: action.payload.plans, // Actualizar planes desde la API.
        cart: action.payload.cart.map((item) => ({
          ...item,
          totalPrice: item.price * (item.quantity || 1), // Calcular el total de cada ítem al cargar.
        })),
      };

    // Manejar la adición de productos o la actualización de cantidades.
    case TYPES.ADD_TO_CART:
    case TYPES.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      // Buscar si el ítem ya está en el carrito.
      const itemIndex = state.cart.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        const item = updatedCart[itemIndex];

        if (action.type === TYPES.UPDATE_QUANTITY) {
          // Actualizar la cantidad con el valor específico.
          item.quantity = quantity;
        } else {
          // Incrementar la cantidad en caso de agregar al carrito.
          item.quantity += 1;
        }

        // Recalcular el precio total del ítem.
        item.totalPrice = item.quantity * item.price;

        return { ...state, cart: updatedCart }; // Actualizar el carrito con los cambios.
      } else {
        // Si el producto no está en el carrito, agregarlo como un nuevo ítem.
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: 1, totalPrice: action.payload.price }, // Inicializar con cantidad y precio total.
          ],
        };
      }
    }

    // Manejar la eliminación de un ítem específico del carrito.
    case TYPES.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id), // Filtrar y eliminar el producto del carrito.
      };

    // Manejar la acción de vaciar el carrito.
    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: [], // Reiniciar el carrito a un estado vacío.
      };

    // Retornar el estado actual si no se reconoce la acción.
    default:
      return state;
  }
};
