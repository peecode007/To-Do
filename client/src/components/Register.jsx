import React, { useEffect, useState } from 'react';
import { register } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from './partials/Header.jsx';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await register(form);
      if (result.status === 200) {
        const { status, data, message } = result.data;
        if (status === 201) {
          setErrors(data);
          toast(message);
        } else if (status === 200) {
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/');
        } else if (status === 202) {
          toast(message);
        }
      } else {
        toast('Something went wrong, please try again');
      }
    } catch (error) {
      toast('Something went wrong, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <ToastContainer />
        <div className='row justify-content-md-center mt-4'>
          <div className='col-lg-5 card border-primary mb-3'>
            <div className='card-header h4 text-center'>Register An Account</div>
            <div className='card-body'>
              <div className='form-group'>
                <label className='col-form-label mt-4'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  className='form-control'
                  placeholder='Enter Your Name'
                />
                {errors?.name && (
                  <small className='form-text text-danger'>{errors.name.msg}</small>
                )}
              </div>

              <div className='form-group'>
                <label className='col-form-label mt-4'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={form.username}
                  onChange={handleInputChange}
                  className='form-control'
                  placeholder='Enter Your Username'
                />
                {errors?.username && (
                  <small className='form-text text-danger'>{errors.username.msg}</small>
                )}
              </div>

              <div className='form-group'>
                <label className='col-form-label mt-4'>Email</label>
                <input
                  type='text'
                  name='email'
                  value={form.email}
                  onChange={handleInputChange}
                  className='form-control'
                  placeholder='Enter Your Email'
                />
                {errors?.email && (
                  <small className='form-text text-danger'>{errors.email.msg}</small>
                )}
              </div>

              <div className='form-group'>
                <label className='col-form-label mt-4'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={form.password}
                  onChange={handleInputChange}
                  className='form-control'
                  placeholder='Enter Your Password'
                />
                {errors?.password && (
                  <small className='form-text text-danger'>{errors.password.msg}</small>
                )}
              </div>

              <div className='row justify-content-md-center form-group mt-4'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='col-sm-6 btn btn-outline-secondary center'
                  disabled={isSubmitting}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
