import { SubmissionError } from 'redux-form';

const errorHandler = (err) => {
  if (!err || !err.response || !err.response.status || err.response.status !== 400) {
    throw err;
  }
  const errors = {
    _error: err.response.data.non_field_errors,
    ...err.response.data.errors,
  };
  throw new SubmissionError(errors);
};

export default errorHandler;
