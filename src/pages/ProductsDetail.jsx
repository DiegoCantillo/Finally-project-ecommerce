import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slice/products.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productsList = useSelector(state => state.products);
    const productDetail = productsList.find(product => product.id === +id)
    const relatedProduct = productsList.filter(related => related?.category.id == productDetail?.category.id)


    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    };
    const decrement = () => {
        setCounter(counter - 1);
    };

    return (
        <>
            <div>
                <div className="product--detail">
                    <h1>New Detail</h1>
                    <h2>{productDetail?.title}</h2>
                    <p>{productDetail?.category.name}</p>
                    <img src={productDetail?.productImgs[0]} alt="" />
                    <div>
                        <button>increment</button>
                        <button>decrement</button>
                    </div>
                </div>
                <div>
                    <h2>{productDetail?.title}</h2>
                    <p>{productDetail?.description}</p>
                    <div>
                        <div>
                            <span>Price</span>
                            <span>{productDetail?.price}</span>
                        </div>
                        <div>
                            <span>Quantity</span>
                            <button onClick={increment}>+</button>
                            <span>{counter}</span>
                            <button
                                onClick={decrement}
                                disabled={counter === 0 ? true : false}
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ul>
                <div className='div-card'>
                    <div className='div--card'>
                        {
                            relatedProduct.map(related => {
                                return (
                                    <li key={related.id}>
                                        <div className='div--card__content'>
                                            <Link to={`/detail/${related.id}`}>
                                                <div className="div--img">
                                                    <img src={related.productImgs[0]} alt={related.title} className='div--card__img' />
                                                </div>
                                                <div className='div--details'>
                                                    <strong>{related.title}</strong>
                                                    <span className='price'>Price</span>
                                                    <span className='amount'>$ {related.price}</span>
                                                </div>
                                            </Link>
                                            <button>CarShop</button>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </div>
                </div>
            </ul>
        </>


    );
};

export default ProductsDetail;