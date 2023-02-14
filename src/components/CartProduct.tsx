import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/md-light-indigo/theme.css';

import { useEffect, useState } from "react";

import { Button } from 'primereact/button';
import { useCart } from "../context/CartContext"

type CartProductProps = {
    id: number
    quantity: number
  }

  interface Props {
    title: string;
    price: number;
    images: string[];
    id: number;
  }

export function CartProduct({ id, quantity }: CartProductProps){
    const {
        getProductQuantity,
        increaseCartQuantity,
        decreaseCartQuantity
      } = useCart()
    const [result, setResult] = useState<Props[]>([]);
    const [showButtons, setShowButtons] = useState(false);

    const modifyQuantity = () => {
     setShowButtons(true);
     };
     const confirmChange = () => {
        setShowButtons(false);
      }
       console.log(quantity +"here")
    
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
      
  const item = result.find(i => i.id === id)
  if (item == null) return null

  return (
    <div className="flex align-items-center">
      <img src={item.images[0]} className="w-32 h-20 cover"
      />
      <div className="mr-auto">
        <div className='pl-2'>
          {item.title}{" "}
          {quantity > 1 && (
            <span className="text-gray-700 text-xs" >
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-gray-700 text-xs pl-2" >
         DKK {item.price}
        </div>
      </div>
      <div> Total:DKK{item.price * quantity}</div>
      <div className="flex align-items-center justify-content-between m-3">
      <div>
           {!showButtons ? (
            <Button icon="pi pi-shopping-cart " label="Modify quantity"  onClick={modifyQuantity}></Button>
          ) : (
            <div className="flex align-items-center flex-column gap-2 mb-3">
              <div className="flex align-items-center justify-content-center gap-2 ">
                <Button  icon="pi pi-minus" onClick={() => decreaseCartQuantity(id)}></Button>
                <div>
                  <div className=" text-gray-700 text-xs">{quantity}</div> 
                </div>
                <Button  icon="pi pi-plus" onClick={() => increaseCartQuantity(id)}></Button>
                <Button icon="pi pi-check" onClick={confirmChange}></Button>
              </div>
              </div>
              
           )}
        </div>
        </div>
    </div>
  )
}

