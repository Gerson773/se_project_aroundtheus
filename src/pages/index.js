// All imports
import "../pages/index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { handleClosePopupWithOutsideClick } from "../utils/utils.js";

import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "5c996316-6337-4579-a87d-d8a06991f1d4",
});

// api.getInitialCards().then((res) => console.log(res));

// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

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
// const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".card");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
const popups = document.querySelectorAll(".modal");

/* Buttons Elements */
const profileCloseButton = document.querySelector("#profile-close-button");
const cardCloseButton = document.querySelector("#card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
// const closePreviewButton = document.querySelector(
//   "#preview-close-image-button"
// );

/* Form Data const*/

api.getUserInfo().then((UserData) => {
  userInfo.setUserInfo({
    userName: UserData.name,
    userDescription: UserData.description,
  });
});
const deleteCardModalSelector = document.querySelector("#card__delete-modal");
const deleteCardPopup = new PopupWithConfirmation(deleteCardModalSelector);

const userInfo = new UserInfo(profileTitle, profileDescription);

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

// New Popupwithform const

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// Create and render card

let cardSection;

const renderCard = (cardData) => {
  const newCard = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteCardClick
  );
  cardSection.addItem(newCard.getView());
};

api.getInitialCards().then((cardData) => {
  cardSection = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    cardListSelector
  );
  cardSection.renderItems();
});

// api.getInitialCards().then((res) => console.log(res));

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   cardListSelector
// );

// cardSection.renderItems();

//Preview Popup Const

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

/*Event Handlers*/

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
  editProfilePopup.close();
}

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardData = { name, link };

  api
    .addCard(cardData)
    .then((res) => {
      renderCard(res, cardListEL);

      addCardPopup.close();
    })

    .catch((err) => {
      console.error(err);
    });
}

// function handleAddCardFormSubmit() {
//   const name = cardTitleInput.value;
//   const link = cardLinkInput.value;
//   renderCard({ name, link }, cardListEL);
// }

function fillProfileForm() {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
}

function openProfileForm() {
  fillProfileForm();
  editProfilePopup.open();
}

// function handleDeleteCardClick(cardId) {
//   if (confirm("Are you sure you want to delete this card?")) {
//     api
//       .removeCard(cardId)
//       .then(() => {
//         Card.remove();
//       })
//       .catch((error) => {
//         console.error("Error deleting card:", error);
//       });
//   }
// }

function handleDeleteCardClick(cardId) {
  deleteCardPopup.setSubmitAction(() => {
    api
      .removeCard(cardId)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  });

  deleteCardPopup.open();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", openProfileForm);
profileCloseButton.addEventListener("click", () => editProfilePopup.close());
addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopup.open();
});
cardCloseButton.addEventListener("click", () => addCardPopup.close());
