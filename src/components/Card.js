class Card {
  constructor(
    { name, link, isLiked, _id, ownerId, userId, myId },
    cardSelector,
    handleCardClick,
    handleDeleteCardClick,
    handleCardLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._likes = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._likesNum = 0;
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

  setLikesStatus(isLiked) {
    this._likes = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._likes) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  // _displayLikeCount() {
  //   debugger;
  //   this._likesNum = this._likes;
  //   this._likeCounter.textContent = this._likesNum.toString();
  // }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleCardLikeClick(this._cardId, this._likes, (isLiked) =>
          this.setLikesStatus(isLiked)
        );
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCardClick(this._cardId);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  // _handleCardLikeClick() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle(".card__like-button_active");
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
    this._renderLikes();

    return this._cardElement;
  }
}

export default Card;
