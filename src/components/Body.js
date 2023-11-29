import { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [list, setList] = useState([])
    const [filteredRestaurant, setFilteredRestaurant] = useState([])
    const [searchText, setSearchText] = useState("")

    // console.log("Body render",list)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.6244806999&page_type=DESKTOP%20WEB_LISTING"
        )

        const json = await data.json()

        console.log(json)

        setList(json.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurant(json.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    };
    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
        return (
            <h1>Looks like you are offline!! Please check your internet connection</h1>
        )

        const {setUserName,loggedInUser}=useContext(UserContext)

    // for online status
    return list.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-2 p-3 flex">
                    <input type="text" className="border borderr-solid border-black m-4 p-1" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    />

                    <button className="px-4 py-2 bg-green-200 m-4 rounded-lg"
                        onClick={() => {
                            console.log(searchText)

                            const filtered = list.filter((res) =>
                                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                            setFilteredRestaurant(filtered);

                        }}
                    >Search</button>

                </div>
                <div className="search m-4 p-4 flex items-center">

                    <button className="px-4 py-2 bg-gray-100 rounded-lg"

                

                        onClick={() => {
                            const filteredList = list.filter((res) => res.info.avgRating > 4.4)
                            setFilteredRestaurant(filteredList)
                        }}>
                        Top rated Restaurants
                    </button>
                </div>

 
                <div className="search m-4 p-4 flex items-center">
                    <label>UserName: </label>
                    <input className="p-2 mx-1 border border-black"
                      value={loggedInUser}
                     onChange={(e)=>setUserName(e.target.value)}/>
                </div>

            </div>
            <div className="flex flex-wrap">
                {filteredRestaurant.map((restaurant) => (
                    <Link
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}>

                        <RestaurantCard resData={restaurant} />
                    </Link>
                ))}
               
            </div>
        </div>
    );
};

export default Body;