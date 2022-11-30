import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk, setPurchase } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log("***********************");
    console.log(purchases);
    console.log("***********************");


    return (
        <div>
            {purchases.map(purchase => (purchase.cart.products.map(prod => (
                <li key={prod}>
                    <Link to={`/detail/${prod.id}`}>
                        <div className="info--shooping">
                            <div className="date">
                                <p style={{fontWeight: 900}}>{prod.productsInCart.createdAt}</p> 
                            </div>
                            <div className="content-purchases">
                                <p style={{fontWeight: 900}}>{prod.title}</p>
                                <div className="price-and__quantity">
                                    <p>{prod.price}<span  style={{fontWeight: 900}}>$</span></p>
                                    <p>{prod.productsInCart.quantity}</p>
                                </div>
                            </div>                          
                        </div>                         
                    </Link>
                </li>     
            )
            )))}

        </div>
    );
};

export default Purchases;