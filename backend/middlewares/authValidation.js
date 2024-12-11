const Joi = require("joi");

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateLogin = (req, res, next) => {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

const validateRegister = (req, res, next) => {
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

module.exports = {
    loginValidation,
    registerValidation,
    validateLogin,
    validateRegister
}