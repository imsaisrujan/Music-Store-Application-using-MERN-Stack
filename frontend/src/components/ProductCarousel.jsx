import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    // <Message variant='danger'>{error}</Message>
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4 mt-3'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Row className='justify-content-center align-items-center'>
            <Col md={6}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
              </Link>
            </Col>
            <Col md={6} className='p-5'>
              <p className='text-light pb-5'>{product.description}</p>
            </Col>
            <Carousel.Caption className='carousel-caption'>
              <h2 className='h3 text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
