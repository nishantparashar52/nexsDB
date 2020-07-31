// components/edit-form.js

import { useState } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

const EditForm = ({ defaultValues, id }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      ...defaultValues,
      creditCardNumber: defaultValues.creditCard.number,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch(`/api/customers/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
  <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="e.g. John"
            ref={register({ required: 'First Name is required' })}
          />
          {errors.firstName && (
            <span role="alert" className="error">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g. Doe"
            ref={register({ required: 'Last Name is required' })}
          />
          {errors.lastName && (
            <span role="alert" className="error">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label>Telephone</label>
          <input
            type="text"
            name="telephone"
            placeholder="e.g. 123-456-7890"
            ref={register}
          />
          {errors.telephone && (
            <span role="alert" className="error">
              {errors.telephone.message}
            </span>
          )}
        </div>

        <div>
          <label>Credit Card Number</label>
          <input
            type="text"
            name="creditCardNumber"
            placeholder="e.g. 1234567890123456"
            ref={register}
          />
          {errors.creditCardNumber && (
            <span role="alert" className="error">
              {errors.creditCardNumber.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Create
          </button>
        </div>
      </form>
  );
};

export default EditForm;