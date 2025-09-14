const validate = {};

validate.name = (name) => {
    return name.length >= 20 && name.length <= 60;
};

validate.address = (address) => {
    return address.length <= 400;
};

validate.password = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,16})/;
    return passwordRegex.test(password);
};

validate.email = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

module.exports = validate;