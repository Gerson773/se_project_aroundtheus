// All imports

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openPopup,
  closePopup,
  handleClosePopupWithOutsideClick,
  handleEscape,
} from "../utils/utils.js";

import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

// Elements From Original index.js

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

export const cardListSelector = ".card";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".card");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const popups = document.querySelectorAll(".modal");

/* Buttons Elements */
const profileCloseButton = document.querySelector("#profile-close-button");
const cardCloseButton = document.querySelector("#card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const closePreviewButton = document.querySelector(
  "#preview-close-image-button"
);

/* Form Data */

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardLinkInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);

const cardSelector = "#card-template";

/*Form Validation*/

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

closePreviewButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

// functions

function renderCard(cardData, cardListEL) {
  const card = new Card(cardData, cardSelector, handleCardClick);
  cardListEL.prepend(card.getView());
}

//Popup Const

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// New Sections To Render Card

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCard = new Card(cardData, "#card-template");
      cardSection.addItem(newCard.getView());
    },
  },
  cardListSelector
);

cardSection.renderItems();

/*Event Handlers*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  evt.target.reset();
  closePopup(profileEditModal);

  editFormValidator.toggleButtonState();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEL);
  evt.target.reset();
  closePopup(addCardModal);

  addFormValidator.toggleButtonState();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

cardCloseButton.addEventListener("click", () => closePopup(addCardModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleClosePopupWithOutsideClick);
});
