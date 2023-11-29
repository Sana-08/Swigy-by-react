// import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useMenu from "../utils/useMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
// import { Menu_API } from "../utils/constants"; 


const Menu=()=>{
    // const [resInfo,setResInfo]=useState(null);

    const {resId}=useParams();

    const dummy="Dummy Data"

    const resInfo=useMenu(resId);

    const [showIndex,setShowIndex]=useState(null);
    
    // useEffect(()=>{
    //     fetchMenu();
    // },[])

    // const fetchMenu=async()=>{
        
    //     const data=await fetch(Menu_API + resId);
    //     const json=await data.json();
    //     setResInfo(json.data)
    // };

    if (resInfo===null) return<Shimmer/>;

    const { name,cuisines,costForTwoMessage}=
        resInfo?.cards[0]?.card?.card?.info;

    const itemCards=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
        // console.log(itemCards)

    const categories=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return(
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>

            {/* categories accordian */}

            {categories.map((category,index)=>(
                <RestaurantCategory 
                 key={category?.card?.card?.title} 
                 data={category?.card?.card}
                 show={index===showIndex? true:false}
                 setShowIndex={()=>setShowIndex(index)}/>
            ))}



            {/* <p>{cuisines.join(", ")}-{costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item)=>(
                    <li key={item.card.info.id}>
                        {item.card.info.name} - {"Rs."}
                        {item.card.info.price/100}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default Menu;