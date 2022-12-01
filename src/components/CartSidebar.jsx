import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkaoutCartThunk, getCartThunk } from '../store/slice/cart.slice';


const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()
    const carts = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])
    
    

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    carts.map(cart => (
                        <div>
                            <p>{cart.title}</p>
                        </div>
                    ))
                }
            </Offcanvas.Body>
            <Button onClick={()=> dispatch(checkaoutCartThunk())}>Checkout</Button>
        </Offcanvas>
    );
};

export default CartSidebar;