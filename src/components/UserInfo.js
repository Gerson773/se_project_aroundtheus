class UserInfo {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this._avatarElement = document.querySelector(".profile__image");
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
