import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({...product, qty}));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  };

  return (
    <Row className='cart-flex'>
      <Col md={8}>
        <h1 style={{marginBottom: '1.25em'}}>Shopping Cart</h1>
        { cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            { cartItems.map(item => (
              <ListGroup className='bg-custom order' key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className='order-product-link'>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) => (addToCartHandler(item, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash style={{ color: 'tomato' }} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup>
            )) }
          </ListGroup>
        ) }
      </Col>
      <Col md={4}>
        <Card className='cart-card'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}) items
              </h2>
              <h3>${cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                id='checkout-btn'
                type='button' 
                variant='outline-light'
                className='btn-block' 
                disabled={cartItems.length === 0} 
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen;