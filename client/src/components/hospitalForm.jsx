import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import config from '../config.json';
import { Input } from './common';

export const HospitalForm = () => {
  const [state, setState] = useState({
    name: '',
    hospitals: [],
    errors: {},
  });

  const { name, hospitals, errors } = state;
  const { apiURL } = config;
  const apiEndPoint = `${apiURL}/hospitals`;
  const hospitalsName = hospitals.map(hospital => hospital.name);

  const schema = Joi.object({
    name: Joi.string()
      .label('Hospital Name')
      .required()
      .invalid(...hospitalsName)
      .messages({
        'any.invalid': '"Hospital Name" must be unique',
      }),
  });

  const validateInput = (name, value) => {
    const errors = {};
    const inputSchema = schema.extract(name);
    const { error: err } = inputSchema.validate(value);

    if (err) errors[name] = err.details[0].message;

    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const errors = validateInput(name, value);

    setState({ ...state, [name]: value, errors });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      await axios.post(apiEndPoint, { name });
    } catch (err) {
      console.log(err);
    }
  };

  const loadHospitals = async () => {
    try {
      const { data: hospitals } = await axios.get(apiEndPoint);

      setState({ ...state, hospitals });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => loadHospitals(), []);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-4">Add Hospital</h4>
      <Input
        type="text"
        name="name"
        label="Hospital Name"
        value={name}
        error={errors['name']}
        onChange={handleChange}
      />
      <div className="form-group">
        <button
          className="btn btn-outline-secondary px-5"
          type="submit"
          disabled={Object.keys(errors).length}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
