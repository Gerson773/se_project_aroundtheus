// // import {
//   openPopup,
//   closePopup,
//   handleClosePopupWithOutsideClick,
//   handleEscape,
// } from "../utils/utils.js";

// const previewImageModal = document.querySelector("#preview-image-modal");
// const imgEL = document.querySelector(".modal__image");
// const previewText = document.querySelector(".modal__preview-title");
// const cardImageEl = document.querySelector(".card__image");

class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // this._cardElement
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => {
    //     this._handlePreviewPicture();
    //   });

    this._cardElement.addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //this preview is no longer needed

  // _handlePreviewPicture() {
  //   imgEL.src = this._link;
  //   imgEL.alt = this._name;
  //   previewText.textContent = this._name;
  //   openPopup(previewImageModal);
  // }

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
