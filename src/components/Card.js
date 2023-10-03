class Card {
  constructor(
    { name, link, isLiked, _id, ownerId, userId, myId },
    cardSelector,
    handleCardClick,
    handleDeleteCardClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._likes = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = _id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._myId = myId;
  }

  getId() {
    return this._id;
  }

  _getData() {
    return {
      name: this._name,
      link: this._link,
    };
  }

  _renderLikes() {
    if (this._likes) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add(".card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove(".card__like-button_active ");
    }
  }

  setLikes(isLiked) {
    this._likes = isLiked;
    this._renderLikes();
  }

  _displayLikeCount() {
    const likesNum = this._likes;
    return (this._likeCounter.textContent = likesNum.lenght);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCardClick(this._id);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  // _handleLikeClick() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }

  _handleDeleteCardClick() {
    this._removeCard();
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handleDeleteCard(cardId) {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".card__delete-button");
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").innerText = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
