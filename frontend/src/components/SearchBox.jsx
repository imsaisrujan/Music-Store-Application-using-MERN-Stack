import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  }

  return (
    <Form onSubmit={ submitHandler } className="d-flex search-box">
      <Form.Control
        id="search-input"
        type='text'
        name='q'
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search products...'
        className='px-4 py-1 m-1'
      ></Form.Control>
      <Button id="search-btn" type='submit' variant='outline-light' className='px-4 py-1 mx-2 my-1'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox;
