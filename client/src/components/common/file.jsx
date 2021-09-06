import React from 'react';

export const File = props => {
  const { name, label, filename, error, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <div className="custom-file">
          <input
            className="custom-file-input"
            type="file"
            name={name}
            id={name}
            {...rest}
          />
          <label className="custom-file-label" htmlFor={name}>
            {filename || 'No file chosen'}
          </label>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
