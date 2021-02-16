const { body } = require('express-validator')


const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const usernameRegex = /^(?=[a-z_\d]*[a-z])[a-z_\d]{6,}$/

const userValidation = {};

/**
 *@desc   validation for user registration
 *@params name, username, email, password, gender   
 **/

userValidation.register = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("Name must be between 2 to 50 characters.")
    .custom(async (name) => {
      if (name.match(/^[A-Za-z ]+$/)) {
        return true;
      } else {
        throw new Error("Name must contain only alphabets");
      }
    }),
  body("email").isEmail().withMessage("invalid email"),
  body("password")
    .matches(passwordRegex)
    .withMessage("Password must contain minimum eight characters, at least one letter and one number and one special character!"),
];

userValidation.login = [
  body("email").isEmail().withMessage("Invalid email!"),
  body("password").not().isEmpty().withMessage("Password is required!"),
];

module.exports = userValidation