const passwords = require('./common-passwords');
const { inherits } = require('util');
const zxcvbn = require('zxcvbn');

function EntropyError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message ||
    `That password isn't sufficiently random and could possibly be cracked easily`;
}

function LengthError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message ||
    `That password is too short and should be at least 8 characters long`;
}

function UniquenessError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message ||
    `That password is too common and should not be in the list of one million common passwords`;
}

inherits(EntropyError, Error);
inherits(LengthError, Error);
inherits(UniquenessError, Error);

function checkLength(password, cb) {
  const valid = password.length >= 8;
  const error = valid ? null : new LengthError();

  if (cb) {
    cb(error, valid);
  } else if (valid) {
    return Promise.resolve(valid);
  } else {
    return Promise.reject(error);
  }
}

function checkUniqueness(password, cb) {
  const valid = !passwords.has(password);
  const error = valid ? null : new UniquenessError();

  if (cb) {
    cb(error, valid);
  } else if (valid) {
    return Promise.resolve(valid);
  } else {
    return Promise.reject(error);
  }
}

function checkEntropy(password, cb) {
  const result = zxcvbn(password);
  const valid = result.score >= 3;
  const error = valid ? null : new EntropyError();

  if (cb) {
    cb(error, valid);
  } else if (valid) {
    return Promise.resolve(valid);
  } else {
    return Promise.reject(error);
  }
}

function checkPassword(password, cb) {
  if (cb) {
    checkLength(password)
      .then(() => checkUniqueness(password))
      .then(() => checkEntropy(password))
      .then(() => {
        cb(null, true);
      })
      .catch(err => {
        cb(err, false);
      });
  } else {
    return new Promise((resolve, reject) => {
      checkLength(password)
        .then(() => checkUniqueness(password))
        .then(() => checkEntropy(password))
        .then(() => resolve(true))
        .catch(err => reject(err));
    });
  }
}

module.exports = {
  checkEntropy,
  checkLength,
  checkPassword,
  checkUniqueness,
  EntropyError,
  LengthError,
  UniquenessError
};
