module.exports = class UserDto {
  roles;
  _id;
  username;



  constructor(model) {
    this.roles = model.roles;
    this._id = model._id;
    this.username = model.username;
  }
}