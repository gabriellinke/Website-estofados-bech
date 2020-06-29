import React from 'react';
import { Link } from "react-router-dom";

import './CartProduct.css';
// É o componente que é utilizado para mostrar os produtos na Home page

interface ProductProps{
    src: string,
    width: number,
    height: number,
    currentQuantity: number,
    maxQuantity: number,
    title: string,
    price: string,
    id: number
}

const Product: React.FC<ProductProps> = (props) =>
{
    return(
        <li key={props.id} className="product">
            <Link to={`/products/${props.id}`}>
                <div className="info">
                    <img src={props.src} width={props.width} height={props.height} alt={props.title}/>
                    <div className="title">{props.title}</div>
                </div>
            </Link>
                <div className="quantity">
                    <div className="currentQuantity">{props.currentQuantity}</div>
                    <div className="maxQuantity">{props.maxQuantity}</div>
                </div>    
                <div className="price">
                    <strong>{props.price}</strong>
                </div>
        </li>
    );
}

export default Product;