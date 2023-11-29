 import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../redux/cartsSlice";

const Cart=()=>{
    const cartItems=useSelector((store)=>store.cart.items)

    const dispatch=useDispatch();

    const handleClearCart=()=>{
        dispatch(clearCart())
    }

    return(
        <div className="text-center m-5 p-5">
            <h1 className="text-3xl font-bold font-serif">Cart</h1>
            <div className="w-6/12 m-auto p-5">
                <button className="p-2 m-2 bg-black text-white rounded-lg" 
                    onClick={handleClearCart}> 
                    Clear Cart</button>
                    {cartItems.length===0 && <h1>Cart is empty. Add items to the cart.</h1>}
                <ItemList items={cartItems}/>
            </div>
        </div>
    )
}

export default Cart;