import { LOGO_URL } from "../utils/constants"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login")

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext)
    // console.log(loggedInUser)

    useEffect(() => {
        // console.log("useEffect called")
    }, []);

    //subscribing a store using a selector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems)

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-blue-100 lg:bg-green-100">
            <div>
                <img className="w-40" src={LOGO_URL} />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">online Status:{onlineStatus ? "✅" : "🔴"}</li>
                    <li className="px-4"><Link to="/home">Home</Link></li>
                    <li className="px-4"><Link to="/about">About</Link></li>
                    <li className="px-4"><Link to="/contact">Contact us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grogery</Link></li>
                    <li className="px-4 font-bold"><Link to="/cart">Cart({cartItems.length} items)</Link></li>
                    <button className="login"
                        onClick={() => {
                            btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                        }}
                    >{btnNameReact}
                    </button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;