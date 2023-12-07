// useForm.js
import { useState } from 'react';

const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const handleFieldChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return {
    formData,
    handleFieldChange,
    handleSubmit,
  };
};

export default useForm;
