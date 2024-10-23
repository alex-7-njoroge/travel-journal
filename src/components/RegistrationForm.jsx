import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  name: Yup.string().required('Name is required'),
  description: Yup.string()
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 3000); // Show modal for 3 seconds before redirecting
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('https://flask-journal-82cu.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful');
        setShowModal(true);
      } else {
        setFieldError('general', data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setFieldError('general', 'An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', name: '', description: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="username">Username</label>
              <Field type="text" name="username" className={styles.input} />
              <ErrorMessage name="username" component="div" className={styles.errorMessage} />
            </div>

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

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="name">Name</label>
              <Field type="text" name="name" className={styles.input} />
              <ErrorMessage name="name" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="description">Description (Optional)</label>
              <Field as="textarea" name="description" className={`${styles.input} ${styles.textarea}`} />
              <ErrorMessage name="description" component="div" className={styles.errorMessage} />
            </div>

            <ErrorMessage name="general" component="div" className={styles.generalError} />

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.successIcon}>✓</div>
            <p>Successfully registered! Kindly login.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
