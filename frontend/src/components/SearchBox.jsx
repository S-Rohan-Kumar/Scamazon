import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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
  };

  const styles = {
    form: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    input: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #eee',
      color: '#111',
      borderRadius: '12px',
      padding: '0.6rem 1.2rem',
      fontSize: '0.95rem',
      width: '100%',
      maxWidth: '350px',
    },
    searchBtn: {
      backgroundColor: '#111',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '0.6rem 1.2rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
    }
  };

  return (
    <Form onSubmit={submitHandler} style={styles.form}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search products..."
        style={styles.input}
        className="shadow-none"
      />
      <button 
        type="submit" 
        style={styles.searchBtn}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <FaSearch size={14} /> 
        <span className="d-none d-md-inline">Search</span>
      </button>
    </Form>
  );
};

export default SearchBox;