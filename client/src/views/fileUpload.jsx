import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config.json';
import { Select, File } from '../components/common';

export const FileUpload = () => {
  const [state, setState] = useState({
    hospitalId: '',
    table: '',
    file: null,
    hospitals: [],
    tables: ['Patient', 'Treatment'],
  });

  const { hospitalId, table, file, hospitals, tables } = state;
  const { apiURL } = config;

  const handleChange = e => {
    const { name, value, files } = e.target;
    const data = name === 'file' ? files[0] : value;

    setState({ ...state, [name]: data });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const apiEndPt = `${apiURL}/upload`;
      const data = new FormData();

      data.append('hospitalId', hospitalId);
      data.append('table', table);
      data.append('file', file);

      await axios.post(apiEndPt, data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadHospitals = async () => {
    try {
      const apiEndPt = `${apiURL}/hospitals`;
      const { data: hospitals } = await axios.get(apiEndPt);

      setState({ ...state, hospitals });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => loadHospitals(), []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md">
          <Select
            name="hospitalId"
            label="Select Hospital"
            items={hospitals}
            attributes={{ key: 'id', value: 'id', show: 'name' }}
            onChange={handleChange}
          />
        </div>
        <div className="col-md">
          <Select
            name="table"
            label="Select Table"
            items={tables}
            indexed={true}
            onChange={handleChange}
          />
        </div>
      </div>
      <File
        name="file"
        label="Upload File"
        filename={file && file.name}
        onChange={handleChange}
      />
      <div className="form-group">
        <button className="btn btn-outline-secondary px-5" type="submit">
          Upload
        </button>
      </div>
    </form>
  );
};
