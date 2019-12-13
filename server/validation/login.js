const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email es invalido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email es requerido';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password es requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
