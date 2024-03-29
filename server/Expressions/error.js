module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Not authorized");
  }

  static ForbiddenError() {
    return new ApiError(403, "Forbidden for you")
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound() {
    return new ApiError(404, "Not found");
  }
};
