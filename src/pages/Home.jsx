import axios from 'axios';
import { Button, InputGroup, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, getProductsThunk, searchProductThunk } from '../store/slice/products.slice';
import "./style.css"

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    const [categories, setCategories] = useState([])
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    console.log(categories);

    return (
        <div className='home'>
            <h1>Componente Home</h1>
            {
                categories.map(category => (
                    <Button key={category.id} onClick={() => dispatch(filterProductsThunk(category.id))}>
                        {category.name}
                    </Button>
                ))
            }
            <InputGroup className="mb-3 search">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />
                <Button variant="outline-secondary"
                    onClick={() => dispatch(searchProductThunk(inputSearch))}
                >
                    Search
                </Button>
            </InputGroup>
            <ul>
                <div className='div-card'>
                    <div className='div--card'>
                        {
                            products.map(product => {
                                return (
                                    <li key={product.id}>
                                        <div className='div--card__content'>
                                            <Link to={`/detail/${product.id}`}>
                                                <div className="div--img">
                                                    <img src={product.productImgs[0]} alt={product.title} className='div--card__img' />
                                                </div>
                                                <div className='div--details'>
                                                    <strong>{product.title}</strong>
                                                    <span className='price'>Price</span>
                                                    <span className='amount'>$ {product.price}</span>
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
        </div>
    );
};

export default Home;