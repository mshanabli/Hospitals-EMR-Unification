import React from 'react';

export const Select = props => {
  const {
    name,
    label,
    items,
    attributes: attrs,
    indexed,
    error,
    ...rest
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value=""></option>
        {items.map((item, idx) =>
          indexed ? (
            <option key={idx} value={item}>
              {item}
            </option>
          ) : (
            <option key={item[attrs.key]} value={item[attrs.value]}>
              {item[attrs.show]}
            </option>
          )
        )}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
