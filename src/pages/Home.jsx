import axios from 'axios';
import { Button, InputGroup, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, getProductsThunk, searchProductThunk } from '../store/slice/products.slice';


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
                    <Button key={category.id} onClick={()=> dispatch(filterProductsThunk(category.id))}>
                        {category.name}
                    </Button>
                ))
            }
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />
                <Button variant="outline-secondary" 
                        onClick={()=> dispatch(searchProductThunk(inputSearch))}
                >
                    Search
                </Button>
            </InputGroup>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/detail/${product.id}`} >{product?.title}</Link>
                        <br />
                        <img src={product.productImgs[1]} alt="" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;