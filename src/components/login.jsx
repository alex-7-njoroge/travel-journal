// LoginForm.js
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginForm.module.css'; // Make sure this CSS module exists


// Validation Schema for Login Form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = ({ user, assignUser }) => {
  const navigate = useNavigate();
  
  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user.access_token) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('https://flask-journal-82cu.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful');
        assignUser(data);
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        setFieldError('email', data.message);
        setFieldError('password', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setFieldError('email', 'An error occurred. Please try again.');
      setFieldError('password', 'An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formField}>
                <label className={styles.label} htmlFor="email">Email</label>
                <Field type="email" name="email" className={styles.input} />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>

              <div className={styles.formField}>
                <label className={styles.label} htmlFor="password">Password</label>
                <Field type="password" name="password" className={styles.input} />
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
              </div>

              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.formFooter}>
          <p>Don't have an account?</p>
          <Link to="/register" className={styles.registerLink}>Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
