module.exports = class UserDto {
  roles;
  id;
  username;



  constructor(model) {
    this.roles = model.roles;
    this.id = model._id;
    this.username = model.username;
  }
}