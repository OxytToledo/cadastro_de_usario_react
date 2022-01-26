function existsOrError(value, msg) {
    if(!value) throw msg
}

function existsOrErrorEmail(email, msg) {
    if (!validateEmail(email)) {
        throw msg
      }
}

const validateEmail = (email) => {
return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

module.exports = { existsOrError, existsOrErrorEmail }