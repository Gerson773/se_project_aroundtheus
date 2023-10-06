class UserInfo {
  constructor(name, description, avatarElement) {
    this.name = name;
    this.description = description;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      description: this.description.textContent,
      name: this.name.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this.name.textContent = name;
    this.description.textContent = description;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
