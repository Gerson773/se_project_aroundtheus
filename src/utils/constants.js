import FormValidator from "../components/FormValidator.js";

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const cardSelector = "#card-template";

/* Profile Elements */
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileTitle = document.querySelector("#profile-title");
export const profileDescription = document.querySelector(
  "#profile-description"
);
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const profileTitleInput = document.querySelector("#profile-title-input");

/* Buttons Elements */

export const profileCloseButton = document.querySelector(
  "#profile-close-button"
);
export const cardCloseButton = document.querySelector("#card-close-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);
export const avatarPopupCloseButton = document.querySelector(
  "#avatar-close-button"
);

/* Add Card Elements */
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const cardListEL = document.querySelector(".card");
export const popups = document.querySelectorAll(".modal");
export const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
export const cardLinkInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);

/* Avatar Elements */
export const avatarElement = document.querySelector(".profile__image");
export const saveAvatarButton = document.querySelector("#save-avatar-button");
export const editAvatarModal = document.querySelector("#avatar-edit-modal");
export const avatarEditFormElement =
  editAvatarModal.querySelector(".modal__form");

/* Avatar Elements */

export const editFormElement = profileEditModal.querySelector(".modal__form");
export const addFormElement = addCardModal.querySelector(".modal__form");

export const editFormValidator = new FormValidator(settings, editFormElement);
export const addFormValidator = new FormValidator(settings, addFormElement);
export const avatarEditFormValidator = new FormValidator(
  settings,
  avatarEditFormElement
);

export default settings;
