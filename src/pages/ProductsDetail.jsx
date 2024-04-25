
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCarThunk } from '../store/slice/cart.slice';
import { getProductsThunk } from '../store/slice/products.slice';


const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productsList = useSelector(state => state.products);
    const productDetail = productsList.find(product => product.id === +id)
    const relatedProduct = productsList.filter(related => related?.category.id == productDetail?.category.id && related.id !== productDetail.id)



    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [quantity, setQuantity] = useState(1);

    const decre = () => {
        setQuantity(quantity - 1)
    }
    const incre = () => {
        setQuantity(quantity + 1)
    }

    const addToCar = () => {
        const car = {
            id: productDetail.id,
            quantity: quantity
        }
        dispatch(addToCarThunk(car));
    }

    const addToCar1 = () => {
        const car = {
            id: productDetail.id,
            quantity: 1
        }
        dispatch(addToCarThunk(car));
    }

    const [positionImg, setPositionImg] = useState(0);

    const changePositionImg = (productId, position)=> {
       setPositionImg((prevValue)=> ({
        ...prevValue,
        [productId]: position
       }))
    }

    return (
        <>
            <div className='main--container__detail'>
                <div className="home--and__title">
                    <Link to={'/'}>
                        <h2>Home</h2>
                    </Link>
                    <div className="contain--point"><div className="point"></div></div>
                    <h3>{productDetail?.title}.</h3>
                </div>
                <Row className='contain--img__info'>
                    <Col lg={7}>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.images[0].url}
                                    alt="First slide"
                                    style={{ height: 320, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.images[1].url}
                                    alt="Second slide"
                                    style={{ height: 320, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.images[2].url}
                                    alt="Third slide"
                                    style={{ height: 320, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col lg className='detail--description'>
                        <h2>{productDetail?.title}</h2>
                        <p>{productDetail?.description}</p>
                        <div className='price--vs--quantity'>
                            <div className='price'>
                                <span>Price</span>
                                <span>${productDetail?.price}.</span>
                            </div>
                            <div className="quantity">
                                <button className='decre' onClick={decre} disabled={quantity == 1}>-</button>
                                <input type="text"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <button className='incre' onClick={incre}>+</button>
                            </div>
                        </div>
                        <Button className="btn--car__detail" onClick={addToCar} >
                            <span>ADD TO CART </span><i className="fa-solid fa-cart-arrow-down"></i>
                        </Button>
                    </Col>
                </Row>
            </div>
            <ul className='related--product'>
                <h2>Related Products.</h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {relatedProduct.map(related => (
                        <Col key={related.id}>
                            <Card>
                                <Link to={`/detail/${related.id}`}>
                                <div className="card-image" 
                                    onMouseEnter={()=> changePositionImg(related.id, 1)}
                                    onMouseLeave={()=> changePositionImg(related.id, 0)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={related.images[positionImg[related.id] || 0].url}
                                        style={{ height: 210, objectFit: 'contain', padding: 30 }}
                                    />
                                </div>
                                <div className="line"></div>
                                </Link>
                                <Card.Body>
                                    <div className="info--card">
                                        <Card.Title><h2 style={{ fontSize: 13 }}>{related.title}</h2></Card.Title>
                                        <div className="p">
                                            <Card.Text>
                                                <span style={{ color: 'rgb(106, 104, 104' }}>Price</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <span style={{ fontSize: 14 }}>${related.price}.</span>
                                            </Card.Text>
                                        </div>
                                        <Button onClick={()=> addToCar1(related.id)}><i className="fa-solid fa-cart-shopping"></i></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ul>
        </>
    );
};

export default ProductsDetail;