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
    console.log(purchases[0]?.cart.products);
    console.log("***********************");


    return (
        <div>
            {purchases.map(purchase => (purchase.cart.products.map(prod => (
                <li>
                    <Link >
                        <div>{prod.title}</div>
                    </Link>
                </li>     
            )
            )))}

        </div>
    );
};

export default Purchases;