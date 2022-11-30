
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
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
    const relatedProduct = productsList.filter(related => related?.category.id == productDetail?.category.id && related.id !== productDetail.id)

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };





    return (
        <>
            <div>
                <div className="home--and__title">
                    <h2>Home</h2><h2 style={{ fontSize: 16 }}>{productDetail?.title}</h2>
                </div>
                <Row className='contain--img__info'>
                    <Col lg >
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs[0]}
                                    alt="First slide"
                                    style={{ height: 295, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs[1]}
                                    alt="Second slide"
                                    style={{ height: 295, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs[2]}
                                    alt="Third slide"
                                    style={{ height: 295, objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col lg className='detail--description'>
                        <h2>{productDetail?.title}</h2>
                        <p>{productDetail?.description}</p>
                        <span>Price</span>
                        <span>{productDetail?.price}</span>
                        <Button className="btn--car__detail">
                            <span>ADD TO CART  </span><i className="fa-solid fa-cart-arrow-down"></i>
                        </Button>
                    </Col>
                </Row>
            </div>
            <ul className='related--product'>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {relatedProduct.map(related => (
                        <Col>
                            <Card>
                                <Link to={`/detail/${related.id}`}>
                                    <Card.Img
                                        key={related.id}
                                        variant="top"
                                        src={related.productImgs[0]}
                                        style={{ height: 210, objectFit: 'contain', padding: 30 }}
                                    />
                                    <div className="line"></div>
                                    <Card.Body>
                                        <div className="info--card">
                                            <Card.Title><h2 style={{ fontSize: 13 }}>{related.title}</h2></Card.Title>
                                            <div className="p">
                                                <Card.Text>
                                                    <span style={{ color: 'rgb(106, 104, 104' }}>Price</span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <span style={{ fontSize: 14 }}>{related.price}</span>
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ul>
        </>


    );
};

export default ProductsDetail;