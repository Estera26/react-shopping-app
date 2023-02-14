import { useEffect, useState } from "react";

import { CartProduct } from "./CartProduct";
import { useCart } from "../context/CartContext"

interface Props {
    title: string;
    price: number;
    images: string[];
    id: number;
  }
export function Cart(){
    const{cartProducts} = useCart()
    const [result, setResult] = useState<Props[]>([]);

    
    
    useEffect(() => {
        const api = async () => {
          const data = await fetch('https://dummyjson.com/products?limit=30', {
            method: "GET"
          });
          const jsonData = await data.json();
          setResult(jsonData.products);
        };
    
        api();
      }, []);
return(
    <div className="gap-5 mr-5">
    {cartProducts.map(prod => (
      <CartProduct key={prod.id} {...prod} />
    ))}
    <div className="float-right mr-4 text-lg font-bold font-mono">
      Total Price: DKK{" "} 
      {cartProducts.reduce((total, cartProduct) => {
          const item = result.find(i => i.id === cartProduct.id)
          return total + (item?.price || 0) * cartProduct.quantity
        }, 0)
      }
    </div>
  </div>
)
}