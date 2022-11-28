import React, { useEffect } from 'react';
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
    const productDetail = productsList.find(product => product.id === Number(id))
    const relatedProduct = productsList.filter(related => related?.category.id == productDetail?.category.id)
  
    return (
        <>
        <div>
            <h1>New Detail</h1>
            <h2>{productDetail?.title}</h2>
            <p>{productDetail?.category.name}</p>
            <img src={productDetail?.productImgs[0]} alt="" />
        </div>
        <div className="prouducts related">
            <ul>
                {relatedProduct.map(related=> (
                    <li key={related.title}>
                        <Link to={`/detail/${related.id}`}>{related.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
        </>


    );
};

export default ProductsDetail;