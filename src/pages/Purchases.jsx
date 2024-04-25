import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    const getFormateDate = (dateString) => {
        const date = new Date(dateString)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString(undefined, options)
    }

 

    return (
        <div className='purchases'>
            <div className="home--and__title">
                <Link to={'/'}>
                    <h2>Home</h2>
                </Link>
                <div className="contain--point"><div className="point"></div></div>
                <h3>Purchases.</h3>
            </div>
            <h1>My Purcharses</h1>
            {purchases.map(prod => (
                < li key={prod.id} >
                    <Link to={`/detail/${prod.id}`}>
                        <div className="info--shooping">
                            <div className="date">
                                <p style={{ fontWeight: 900 }}>{getFormateDate(prod.createdAt)}</p>
                            </div>
                            <div className="content-purchases">
                                <img src={prod.product.images[0].url} alt={`img-${prod.product.title}`} style={{width: '70px'}}/>
                                <p className='title-purchase' style={{ fontWeight: 900 }}>{prod.product.title}</p>
                                <div className="price-and__quantity">
                                    <p>{prod.product.price}<span style={{ fontWeight: 900, margin: '5px' }} >$</span></p>
                                    <p className='quantity'>{prod.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            )
            )}

        </div >
    );
};

export default Purchases;