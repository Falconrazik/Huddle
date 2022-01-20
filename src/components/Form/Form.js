import React, { useState } from 'react';
import './Form.css';
import FormLogin from './FormLogin';
import FormSignup from './FormSignUp';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-6.svg' alt='spaceship' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
          // <FormLogin />
        ) : (
          navigate('/app')
        )}
      </div>
    </>
  );
};

export default Form;