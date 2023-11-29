import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory=({data,show,setShowIndex,dummy})=>{

    // const [show,setShow]=useState(false)

    const handleClick=()=>{
        setShowIndex()
    }

    return(
        <div>
            {/* Header */}
            <div className="w-6/12 m-auto my-4 bg-gray-100 shadow-lg p-2">
                <div className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                <span className="font-bold text-lg">{data.title} ({data.itemCards.length}) {console.log(data.title)}</span>
                <span>🔽</span> 
                </div>
                {show && <ItemList items={data.itemCards} dummy={dummy}/>}
            </div>
        </div>
    );
};

export default RestaurantCategory;