module.exports = class UserDto {
  _id;
  roles;
  username;

  constructor(model) {
    this._id = model._id;
    this.roles = model.roles;
    this.username = model.username;
  }
}