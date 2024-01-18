import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducers";

const cartInitialState = {
    cartList : [],
    total : 0
}

 const CartContext = createContext(cartInitialState);

export const CartProvider =({children}) => {

    const [state , dispatch] = useReducer(cartReducer , cartInitialState);

    function addToCart(product) {
        const updatedList = state.cartList.concat(product);
        const total = state.total + product.price;

        dispatch({
            type: "ADD_TO_CART",
            payload : {
                products : updatedList,
                total : total
            }
        })
    }

    function removeFromCart(product) {
        const updatedList = state.cartList.filter(item => item.id !== product.id);
        const total = state.total - product.price;

        dispatch({
            type: "REMOVE_FROM_CART",
            payload : {
                products : updatedList,
                total : total
            }
        })
    }

    function clearCart(){
        dispatch({
            type: "CLEAR_CART"
        })
    }



    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
}