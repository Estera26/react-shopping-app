import { ReactNode, createContext, useContext, useState } from "react"

import { useLocalStorage } from "../hooks/useLocalStorage"

type CartProviderProps = {
    children: ReactNode
  }

  
type CartProduct = {
    id: number
    quantity: number
  }

  type CartContext = {
     getProductQuantity: (id: number) => number
     increaseCartQuantity: (id: number) => void
     decreaseCartQuantity: (id: number) => void
     removeFromCart: (id: number) => void
     cartQuantity: number
     cartProducts: CartProduct[]
  }

  const CartContext = createContext({} as CartContext)
  
export function useCart(){
    return useContext(CartContext)
}

export function CartProvider({ children }: CartProviderProps){
    const[cartProducts,setCartItems] = useLocalStorage<CartProduct[]>("cart",[])

    const cartQuantity = cartProducts.reduce((quantity, item) => item.quantity + quantity, 0);

    function getProductQuantity(id: number) {
        return cartProducts.find(item => item.id === id)?.quantity || 0
      }

      function increaseCartQuantity(id: number) {
        setCartItems(currProducts => {
          if (currProducts.find(item => item.id === id) == null) {
            return [...currProducts, { id, quantity: 1 }]
          } else {
            return currProducts.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      function decreaseCartQuantity(id: number) {
        setCartItems(currProducts => {
          if (currProducts.find(item => item.id === id)?.quantity === 1) {
            return currProducts.filter(item => item.id !== id)
          } else {
            return currProducts.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }
      function removeFromCart(id: number) {
        setCartItems(currProducts => {
          return currProducts.filter(item => item.id !== id)
        })
      }
      
    return (
        <CartContext.Provider
          value={{ getProductQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartProducts,
            cartQuantity}}
        >
          {children}
        </CartContext.Provider>
      )
}