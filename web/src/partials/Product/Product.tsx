import React from 'react';
import './Product.css';
import { Link } from "react-router-dom";

// É o componente que é utilizado para mostrar os produtos na Home page

interface ProductProps{
    src: string,
    width: number,
    height: number,
    title: string,
    price: string,
    conditions?: string
    id: number
}

const Product: React.FC<ProductProps> = (props) =>
{
    return(
        <li key={props.id} className="product">
            <Link to={`/products/${props.id}`}>
                <div className="image">
                    <img src={props.src} width={props.width} height={props.height} alt={props.title}/>
                </div>
                <div className="info">
                    <div className="title">{props.title}</div>
                    <div className="price">
                        <strong>{props.price}</strong>
                        <p>{props.conditions}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default Product;