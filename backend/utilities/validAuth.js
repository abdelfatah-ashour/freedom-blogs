const joi = require("joi");

const signupValid = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).max(25).required().messages({
      "string.min": `username should have a minimum length of {#limit}`,
      "any.required": `username is a required`,
    }),
    email: joi.string().max(55).email().required().messages({
      "string.email": `email must be an E-mail valid`,
      "any.required": `password is a required`,
    }),
    password: joi.string().min(8).required().messages({
      "string.min": `password should have a minimum length of {#limit}`,
      "any.required": `password is a required`,
    }),
  });

  return schema.validate(data);
};

const loginValid = (data) => {
  const schema = joi.object({
    email: joi.string().max(55).email().required().messages({
      "string.email": `email must be an E-mail valid`,
      "any.required": `password is a required`,
    }),
    password: joi.string().min(8).required().messages({
      "string.min": `password should have a minimum length of {#limit}`,
      "any.required": `password is a required`,
    }),
  });

  return schema.validate(data);
};

const articleValid = (file) => {
  const schema = joi.object({
    head: joi.string().min(16).required(),
    category: joi.string().min(1).required(),
  });

  return schema.validate(file);
};

module.exports = {
  signupValid,
  loginValid,
  articleValid,
};
