import axios from 'axios';
import { Button, InputGroup, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, getProductsThunk, searchProductThunk } from '../store/slice/products.slice';
import "./style.css"
import { addToCarThunk } from '../store/slice/cart.slice';

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    const [categories, setCategories] = useState([])
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data))
    }, [])


    const addToCar = (id) => {
        const car = {
            quantity: 1,
            productId: id,
        }
        dispatch(addToCarThunk(car));
    }

    const [positionImg, setPositionImg] =  useState(0)


    const ChangeProductImg = (productId, position) => {
        setPositionImg(prevState => ({
            ...prevState,
            [productId]: position
        }));
    }

    return (
        <div className='home'>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item onClick={() => dispatch(filterProductsThunk(category.id))}
                                    style={{ cursor: 'pointer' }}
                                    key={category.id}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    <InputGroup className="mb-3">
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
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {products.map(product => (
                                <Col key={product.id}>
                                    <Card >
                                        <Link to={`/detail/${product.id}`} >
                                            <div  className='card-image'
                                                onMouseEnter={() => ChangeProductImg(product.id, 1)}
                                                onMouseLeave={() => ChangeProductImg(product.id, 0)}>
                                                <Card.Img
                                                    key={product.id}
                                                    variant="top"
                                                    src={product.images[positionImg[product.id] || 0]?.url}
                                                    style={{ height: 210, objectFit: 'contain', padding: 30 }}
                                                />
                                            </div>
                                        </Link>
                                        <div className="line"></div>
                                        <Card.Body>
                                            <div className="info--card">
                                                <Card.Title><h2 style={{ fontSize: 13, fontFamily: "arial" }}>{product.title}</h2></Card.Title>
                                                <div className="p">
                                                    <Card.Text>
                                                        <span style={{ color: 'rgb(106, 104, 104' }}>Price</span>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <span style={{ fontSize: 14 }}>${product.price}.</span>
                                                    </Card.Text>
                                                </div>
                                                <Button onClick={()=> addToCar(product.id)}><i className="fa-solid fa-cart-shopping"></i></Button>
                                            </div>
                                        </Card.Body>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </ul>
                </Col>
            </Row>
        </div>
    );
};

export default Home;