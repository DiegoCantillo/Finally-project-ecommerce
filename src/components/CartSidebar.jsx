import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  checkaoutCartThunk, deleteCartThunk, getCartThunk } from '../store/slice/cart.slice';


const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()
    const carts = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    
   const filterPrice = carts.map(price => price.price)
   
   let numberPriceArray = [] 
   for(let i = 0; i < filterPrice.length; i++){
   const coverageN = Number(filterPrice[i] )
   numberPriceArray.push(coverageN)
   }
   
   const resultPrices = numberPriceArray .reduce((a, b) => a + b, 0)
    ;
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{fontFamily: "Arial"}} >shopping cart <i className="fa-solid fa-cart-arrow-down"></i></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    carts.map(cart => (
                        <div key={cart.id} className='contend--product__delete'>
                            <div className='title__quantity'>
                                <div className="name-product">
                                    <p>{cart.title}</p>
                                </div>
                                <div className="quantity-nav">
                                    <span>{cart.productsInCart.quantity}</span>
                                </div>
                            </div>
                            <div className="delete">
                                <span onClick={()=> dispatch(deleteCartThunk(cart.id))}><i className="fa-regular fa-trash-can"></i></span>
                                <span style={{fontSize: 12}}>${cart.price}.</span>
                            </div>
                        </div>
                    ))
                }
            </Offcanvas.Body>
            <div className="line" style={{height: 2, background: "black", marginBottom: 8}}></div>
            <div className="total__Price">
                <h5>total:</h5> <span>${resultPrices}.</span>
            </div>
            <Button onClick={()=> dispatch(checkaoutCartThunk())}>Checkout</Button>
        </Offcanvas>
    );
};

export default CartSidebar;