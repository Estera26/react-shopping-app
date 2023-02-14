import React, { useEffect, useState } from 'react'

import { InputText } from 'primereact/inputtext';
import { Product } from "../components/Product"
import axios from  "axios"

type Props = {
    title: string;
    price: number;
    images: string[];
    id:number;
  };

export function Shop () {
    const [result, setResult] = useState<Props | undefined>(undefined);
    const[search,setSearch] = useState("")
    
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

      useEffect(() => {
        const api = async () => {
          const data = await fetch('https://dummyjson.com/products/search?q=${search}', {
            method: "GET"
          });
          const jsonData = await data.json();
          setSearch(jsonData.products);
        };
    
        api();
      }, []);

    
  return (
    <div>
   <div className="justify-center text-xl text-indigo-400 font-mono">Store</div>
      {result && (
        <Product
          title={result.title}
          price={result.price}
          images={result.images}
          id={result.id}
        />
      )}
    </div>
  );
    }































    