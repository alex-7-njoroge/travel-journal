import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema for Formik
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  profilePicture: Yup.mixed(),
});

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Sub-task 1.3.5: Fetch current user data from API when component mounts
  useEffect(() => {
    fetch('/api/profile') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture || null, // Optionally display existing profile picture
        });
      })
      .catch((error) => setErrorMessage('Failed to fetch user data.'));
  }, []);

  // Sub-task 1.3.4: Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);

    if (values.profilePicture) {
      formData.append('profilePicture', values.profilePicture);
    }

    fetch('/api/profile/update', { // Replace with actual API endpoint
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Profile updated successfully!');
        setSubmitting(false);
      })
      .catch((error) => {
        setErrorMessage('Failed to update profile.');
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <Formik
        enableReinitialize
        initialValues={{
          username: userData.username,
          email: userData.email,
          profilePicture: null, // New profile picture will be uploaded
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>
            
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            
            <div>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={(event) => {
                  setFieldValue('profilePicture', event.currentTarget.files[0]);
                }}
              />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
