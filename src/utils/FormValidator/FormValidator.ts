// https://github.com/chriso/validator.js
import validator from 'validator';

const getErrorMsg = (errorCode, param, localePhrases = {}) => {
  let data = '';
  let errorMsg = '';

  switch (errorCode) {
    case 'required':
      errorMsg = 'Field is required';
      break;

    case 'email':
      errorMsg = 'Incorrect email';
      break;

    case 'number':
      errorMsg = 'Value should be a number';
      break;

    case 'integer':
      errorMsg = 'Value should be integer';
      break;

    case 'regex':
      errorMsg = 'Value doesnt match pattern';
      break;

    case 'alphanum':
      errorMsg = 'Value should be alphanumeric';
      break;

    case 'url':
      errorMsg = 'Incorrect url';
      break;

    case 'equalto':
      errorMsg = `Value should be equal to ${param}`;
      break;

    case 'minlen':
      errorMsg = `Min length ${param}`;
      break;

    case 'maxlen':
      errorMsg = `Max length ${param}`;
      break;

    case 'min-max-len':
      data = param.split(',');
      errorMsg = `Value length should be less than ${data[1]} and greater than ${data[0]}`
      break;

    case 'len':
      errorMsg = `Length should be ${param}`;
      break;

    case 'min':
      errorMsg = `Value should be more than ${param}`;
      break;

    case 'max':
      errorMsg = `Value should be less than ${param}`;
      break;

    case 'min-max':
      data = param.split(',');
      errorMsg = `Value should be less than ${data[1]} and greater than ${data[0]}`
      break;

    case 'list':
      errorMsg = `Values doesn't contain ${param}`;
      break;

    default:
      errorMsg = 'Bad value';
      break;
  }

  return errorMsg;
};

/**
 * Helper methods to validate form inputs
 * using controlled components
 */
export const FormValidator = (localePhrases = {}) => {
  /**
     * Validate input element
     * @param element Dome element of the input
     * Uses the following attributes
     *     data-validate: array in json format with validation methods
     *     data-param: used to provide arguments for certain methods.
     */
  const validate = (element: HTMLInputElement) => {
    if (!element.getAttribute('data-validate')) {
      return [];
    }

    const isCheckbox = element.type === 'checkbox';
    const { value } = element;
    const { name } = element;

    if (!name) throw new Error('Input name must not be empty.');

    // use getAttribute to support IE10+
    const param = element.getAttribute('data-param');
    const validations = JSON.parse(element.getAttribute('data-validate'));

    const result = []; // [validate_code]: true (if has validation error)
    let data: any = '';
    const value2 = document.getElementById(param)?.['value'];

    if (validations && validations.length) {
      /*  Result of each validation must be true if the input is invalid
                and false if valid. */
      validations.forEach((m) => {
        switch (m) {
          case 'required':
            result[m] = isCheckbox ? element.checked === false : validator.isEmpty(value);
            break;
          case 'email':
            result[m] = value && value.length > 0 ? !validator.isEmail(value) : false;
            break;
          case 'number':
            result[m] = value && value.length > 0 ? !validator.isNumeric(value) : false;
            break;
          case 'integer':
            result[m] = value && value.length > 0 ? !validator.isInt(value) : false;
            break;
          case 'regex':
            result[m] = value && value.length > 0 ? !(new RegExp(param).test(value?.replace(/_/g, '') || '')) : false;
            break;
          case 'alphanum':
            result[m] = value && value.length > 0 ? !validator.isAlphanumeric(value) : false;
            break;
          case 'url':
            result[m] = value && value.length > 0 ? !validator.isURL(value) : false;
            break;
          case 'equalto':
            // here we expect a valid ID as param
            result[m] = !validator.equals(value, value2);
            break;
          case 'minlen':
            result[m] = !validator.isLength(value?.trim() || '', { min: param });
            break;
          case 'maxlen':
            result[m] = value && value.length > 0 ? !validator.isLength(value?.trim() || '', { max: param }) : false;
            break;
          case 'max-max-len':
            data = param.split(',');
            result[m] = value && value.length > 0
              ? !validator.isLength(value?.trim() || '', { min: validator.toInt(data[0]), max: validator.toInt(data[1]) })
              : false;
            break;
          case 'len':
            result[m] = value && value.length > 0
              ? !validator.isLength(value?.trim()?.replace(/_/g, '') || '', { min: param, max: param })
              : false;
            break;
          case 'min':
            result[m] = value && value.length > 0 ? !validator.isFloat(value, { min: validator.toInt(param) }) : false;
            break;
          case 'max':
            result[m] = value && value.length > 0 ? !validator.isFloat(value, { max: validator.toInt(param) }) : false;
            break;
          case 'min-max':
            /* pass the min & max value in the the data-param like this data-param="0,12"
             min:0 , max:12
            */
            data = param.split(',');
            result[m] = value && value.length > 0 ?
              !(validator.isFloat(value, { min: data[0] }) && validator.isFloat(value, { max: data[1] }))
              : false;
            break;
          case 'list':
            const list = JSON.parse(param);
            result[m] = !validator.isIn(value, list);
            break;
          default:
            throw new Error('Unrecognized validator.');
        }
      });
    }

    const newErrors = Object.keys(result)
      .filter((error) => result[error])
      .map((errorCode) => ({
        field: name,
        code: errorCode,
        message: getErrorMsg(errorCode, param, localePhrases),
      }));

    return newErrors;
  };

  /**
     * Bulk validation of input elements.
     * Used with form elements collection.
     * @param  {Array} inputs Array for DOM element
     * @return {Object}       Contains array of error and a flag to
     *                        indicate if there was a validation error
     */
  const bulkValidate = (inputs) => {
    let errors = [];
    let hasError = false;

    inputs.filter((input) => input.getAttribute('data-validate')).forEach((input) => {
      const newErrors = validate(input);

      errors = [...errors, ...newErrors];

      if (!hasError) hasError = errors.length > 0;
    });

    return {
      errors,
      hasError,
    };
  };

  return {
    validate,
    bulkValidate,
  };
};
