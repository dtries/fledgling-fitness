const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};


    // Convert empty fields to an empty string for validator functions
        data.name = !isEmpty(data.name) ? data.name : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";

        // Name checks
        if (Validator.isEmpty(data.name)) {
            errors.name = "A Name is Required";
        }

        // Email checks
        if (Validator.isEmpty(data.email)) {
            errors.email = "An Email is Required";
        } else if (!Validator.isEmail(data.email)) {
            errors.email = "Email Provided is Invalid";
        }

        // Password Checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "A Password is Required";
        }

        if (Validator.isEmpty(data.password2)) {
            errors.password2 = "Password Confirmation is Required";
        }

        if (!Validator.isLength(data.password, {min: 6, max: 30})) {
            errors.password = "Minimum Password Length is 6 Characters";
        }

        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Passwords Do Not Match";
        }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
