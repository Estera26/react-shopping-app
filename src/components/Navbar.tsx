import { Button } from 'primereact/button';
import{Link} from "react-router-dom"
import { useCart } from '../context/CartContext'
import { useNavigate } from "react-router-dom";

export function Navbar(){
    const{cartQuantity}=useCart()
    let navigate= useNavigate()
    const routeChange =() =>
    {
        let path = '/cart';
        navigate(path)
    }
    
    return <div className="bg-indigo-700 h-24 w-full shadow-sm mb-3 ">
        <div>
            <div>
                <div className=" py-5 px-2">
                   
                <Link to="/" className="justify-center text-xl text-indigo-400 font-mono">Store</Link>
                
                <Button
                className="p-button p-button-text p-button-raised pl-20 bg-indigo-400 align-middle float-right w-1"
                icon="pi pi-cart-plus bg-indigo-400 p-2"
                onClick={routeChange}
                badge= {cartQuantity}
                badgeClassName="p-badge bg-indigo-400 pr-3">
            </Button>
            </div>
            </div>
           
            </div>
            
        </div>
   
}