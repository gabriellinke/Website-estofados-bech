import React from 'react';
import './Product.css';
import api from '../../services/api';

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
    </li>
    );
}

export default Product;