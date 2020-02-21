import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const uuidv4 = require('uuid/v4');


function AddReport() {
  const [form, setForm] = useState({
    reportName: '',
    reportId: uuidv4(),
    reportFormat: '',
    reportNotes: '',
    testType: '',
    testEnv: ''
  });
  const [errors, setErrors] = useState({});

  const { count, user } = useSelector((state) => ({
    count: state.counter.count,
    user: state.user
  }), shallowEqual);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container" />
  );
}
