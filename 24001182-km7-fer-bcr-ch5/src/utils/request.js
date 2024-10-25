class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message ? message : "Data Not found!");
    this.status = 404;
  }
}
class Unauthorized extends Error {
  constructor(message) {
    super(message ? message : "Unauthorized access!");
    this.status = 401;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message ? message : "You did not have access to this data!");
    this.status = 403;
  }
}

module.exports = { BadRequestError, NotFoundError, Unauthorized, Forbidden };
