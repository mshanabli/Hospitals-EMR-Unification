import React from 'react';

export const Input = props => {
  const { name, label, type, value, error, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        type={type}
        name={name}
        id={name}
        value={value}
        {...rest}
      />
      {error && <div className="alert alert-danger mt-2 p-2">{error}</div>}
    </div>
  );
};
