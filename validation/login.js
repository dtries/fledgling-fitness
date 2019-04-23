const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to empty strings for validator functions
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
        if (Validator.isEmpty(data.email)) {
            errors.email = "Email is Required";
        } else if (!Validator.isEmail(data.email)) {
            errors.email = "Email is Invalid";
        }

    // Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "A Password is Required";
        }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};