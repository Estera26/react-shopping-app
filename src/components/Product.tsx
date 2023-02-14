import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/md-light-indigo/theme.css";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import { useCart } from "../context/CartContext";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

  
export function Product({ id, title, price, images }: ProductProps) {
  const {
    getProductQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();

  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const rows = useRef(6);
  const datasource = useRef<ProductProps[]>([]);
  const isMounted = useRef(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
 


  const ProductService = {
    async getProducts(): Promise<ProductProps[]> {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=30",
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        return jsonData.products;
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    async getProductsByTitle(query: string): Promise<ProductProps[]> {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${query}`,
            {
              method: "GET",
            }
          );
          const jsonData = await response.json();
          return jsonData.products;
        } catch (error) {
          console.error(error);
          return [];
        }
      },
  };
  const handleSearch = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    ProductService.getProductsByTitle(query)
      .then((data) => {
        datasource.current = data;
        setTotalRecords(data.length);
        setProducts(datasource.current.slice(0, rows.current));
        setLoading(false);
      });
  };
  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
      ProductService.getProducts().then((data) => {
        datasource.current = data;
        setTotalRecords(data.length);
        setProducts(datasource.current.slice(0, rows.current));
        setLoading(false);
      });
    }, 1000);
  }, []);
  
  const onPage = (event: any) => {
    setLoading(true);
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
      const newProducts =
        startIndex === endIndex
          ? datasource.current.slice(startIndex)
          : datasource.current.slice(startIndex, endIndex);

      setFirst(startIndex);
      setProducts(newProducts);
      setLoading(false);
    }, 1000);
  };



  const renderGridItem = (data: any) => {
    const quantity = getProductQuantity(data.id);
    return (
      <div className="col-12 md:col-4">
        <div className="m-2 border-3 surface-border card">
          <div className="flex align-items-center justify-content-between">
            <div className="ml-3 mt-3">
              <i className="pi pi-tag vertical-align-middle mr-2"></i>
              <span className="font-semibold vertical-align-middle ">
                {data.category}
              </span>
            </div>
          </div>
          <div>
            <img
              className="w-9 my-5 mr-5 ml-6 shadow-3 h-52"
              src={data.images[0]}
              alt={data.title}
            />
            <div className="text-2xl font-bold text-center">{data.title}</div>
          </div>
          <div className="flex align-items-center justify-content-between m-3">
            <span className="align-self-center text-2xl font-semibold mb-2 md:align-self-end">
              DKK {data.price}
            </span>
            <span>
              {quantity === 0 ? (
                <Button
                  icon="pi pi-shopping-cart"
                  label="Add to Cart"
                  onClick={() => increaseCartQuantity(data.id)}
                ></Button>
              ) : (
                <div className="flex align-items-center flex-column gap-2 mb-3">
                  <div className="flex align-items-center justify-content-center gap-2 ">
                    <Button
                      icon="pi pi-minus"
                      onClick={() => decreaseCartQuantity(data.id)}
                    ></Button>
                    <div>
                      <span className=" text-sm text-bold ">{quantity}</span>
                    </div>
                    <Button
                      icon="pi pi-plus"
                      onClick={() => increaseCartQuantity(data.id)}
                    ></Button>
                    <Button
                      icon="pi pi-trash"
                      onClick={() => removeFromCart(data.id)}
                    ></Button>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
     <InputText
        placeholder="Search by title"
        className="w-2/3 mb-4"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <DataView
        value={products}
        itemTemplate={renderGridItem}
        lazy
        paginator
        paginatorPosition={"bottom"}
        rows={rows.current}
        totalRecords={totalRecords}
        first={first}
        onPage={onPage}
        loading={loading}
      />
    </div>
  );
}
