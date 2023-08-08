import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openPopup,
  closePopup,
  handleClosePopupWithOutsideClick,
  escapePopup,
} from "../utils/utils.js";

const initialCards = [
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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

/*Elements*/
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
/* Functions*/

//function openPopup(popup) {
//  popup.classList.add("modal_opened");
//  document.addEventListener("keydown", escapePopup);
//}

//function closePopup(popup) {
//  popup.classList.remove("modal_opened");
//  document.removeEventListener("keydown", escapePopup);
// }

const cardSelector = "#card-template";

/*Form Validation*/

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//function getCardElement(cardData) {
//const cardElement = cardTemplate.cloneNode(true);
//const cardImageEl = cardElement.querySelector(".card__image");
//const imgEL = previewImageModal.querySelector(".modal__image");
//const cardTitleEl = cardElement.querySelector(".card__title");
//  const likeButton = cardElement.querySelector(".card__like-button");
//  const deleteButton = cardElement.querySelector(".card__delete-button");
//const previewText = previewImageModal.querySelector(".modal__preview-title");

//cardImageEl.addEventListener("click", () => {
//  imgEL.src = cardData.link;
//  imgEL.alt = cardData.name;
//  previewText.textContent = cardData.name;
//  openPopup(previewImageModal);
//});

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// deleteButton.addEventListener("click", () => {
//   cardElement.remove();
// });

//  cardImageEl.alt = cardData.name;
//  cardImageEl.src = cardData.link;
//  cardTitleEl.textContent = cardData.name;

//  return cardElement;
//}

closePreviewButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

function renderCard(cardData, cardListEL) {
  const card = new Card(cardData, cardSelector);
  cardListEL.prepend(card.getView());
}

/*Event Handlers*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  evt.target.reset();
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  getView({ name, link }, cardListEL);
  evt.target.reset();
  closePopup(addCardModal);

  editFormValidator.togglesButtonState();
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
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(addCardModal);
});

cardCloseButton.addEventListener("click", () => closePopup(addCardModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEL));

//const handleClosePopupWithOutsideClick = (evt) => {
//  if (evt.target.classList.contains("modal_opened")) {
//    closePopup(evt.currentTarget);
//  }
//};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleClosePopupWithOutsideClick);
});

//function escapePopup(evt) {
//  if (evt.key === "Escape") {
//    const openedModal = document.querySelector(".modal_opened");
//    closePopup(openedModal);
//  }
//}
