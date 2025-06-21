import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from "../components/Message";
import Meta from "../components/Meta";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

function Details() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector(state => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success('Review added');
      setComment('');  
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Link className="btn btn-light my-3" to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <h1 className="heading details-heading">{product.name}</h1>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <Card className="bg-custom details">
                <ListGroup variant="flush" className="bg-custom stock">
                <h3>{product.name}</h3>
                <p>
                  <Rating value={product.rating} text={`${product.rating} (${product.numReviews} reviews)`} />
                </p>
                {/* <p>Price: ${product.price}</p> */}
                <p className="description">{product.description}</p>
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stock-card">
                <ListGroup variant="flush" className="bg-custom stock">
                  <ListGroup>
                    <Row className="stock-row">
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup>

                  <ListGroup>
                    <Row className="stock-row">
                      <Col>Status:</Col>
                      <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                    </Row>
                  </ListGroup>

                  {product.countInStock > 0 && (
                    <ListGroup>
                      <Row className="stock-row">
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            id="qty-select"
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup>
                  )}

                  <ListGroup>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='review'>
            <Col md={6} className="review-card">
              <ListGroup>
                <h3 className="review-form-heading">Add a Review</h3>
                {loadingProductReview && <Loader />}
                { userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        id="rating-select"
                        as='select'
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-4">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        id='review-comment'
                        as='textarea'
                        row='3'
                        placeholder='Your comments here...'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      id='review-btn'
                      disabled={loadingProductReview}
                      type='submit'
                      variant='outline-light'
                    >Submit</Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to leave a review{' '}
                  </Message>
                ) }
              </ListGroup>
            </Col>
            <Col md={6} className="reviews">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                { product.reviews.map(review => (
                  <article className='review-block' key={review._id}>
                    <p className="review-user">{review.name}</p>
                    <Rating value={review.rating} />
                    <p className="review-date">{review.createdAt.substring(0, 10)}</p>
                    <p className="review-comment">{review.comment}</p>
                  </article>
                )) }
              </ListGroup>
            </Col>
            
          </Row>
        </>
      )}

    </>
  )
}

export default Details;