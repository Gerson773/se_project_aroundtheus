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
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".card");
const popups = document.querySelectorAll(".modal");

/* Buttons Elements */
const profileCloseButton = document.querySelector("#profile-close-button");
const cardCloseButton = document.querySelector("#card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const deletePopupCloseButton = document.querySelector("#delete-modal-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const avatarPopupCloseButton = document.querySelector("#avatar-close-button");
const avatarElement = document.querySelector(".profile__image");
const editAvatarModal = document.querySelector("#avatar-edit-modal");
const saveAvatarButton = document.querySelector("#save-avatar-button");
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

// Likes Api

function handleCardLikeClick(cardId, isLiked) {
  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((cardData) => {
        this._likes = cardData.isLiked;
        this._renderLikes();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((cardData) => {
        this._likes = cardData.isLiked;
        this._renderLikes();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Edit Avatar

const editAvatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleEditAvatar
);

function handleEditAvatar(avatar) {
  editAvatarPopup.setLoading(true);
  api
    .updateProfileAvatar(avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.setLoading(false, "Save");
    });
}

editAvatarPopup.setEventListeners();

profileAvatarButton.addEventListener("click", () => editAvatarPopup.open());

// User Info + Update Profile

const userInfo = new UserInfo(profileTitle, profileDescription, avatarElement);

function fillProfileForm() {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
}

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
});

function handleProfileEditSubmit(data) {
  api
    .updateProfile(data)
    .then(() => {
      editProfilePopup.close();
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {});
}

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// Add Card APi

function handleAddCardFormSubmit() {
  const { value: name } = cardTitleInput;
  const { value: link } = cardLinkInput;
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

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function openProfileForm() {
  fillProfileForm();
  cardListEL;
  editProfilePopup.open();
}

//Delete Card const

const deleteCardPopup = new PopupWithConfirmation("#card__delete-modal");

deleteCardPopup.setEventListeners();

let newCard;

function handleDeleteCardClick(cardId) {
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoading(true);
    api
      .removeCard(cardId)
      .then(() => {
        if (newCard) {
          newCard.removeCard();
        }
        deleteCardPopup.close();
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardPopup.setLoading(false);
      });
  });
  deleteCardPopup.open();
}

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
const avatarEditFormElement = editAvatarModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);
const avatarEditFormValidator = new FormValidator(
  settings,
  avatarEditFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

// Create and render card

let cardSection;

const renderCard = (cardData) => {
  const newCard = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteCardClick,
    handleCardLikeClick
  );
  cardSection.addItem(newCard.getView());
};

api.getInitialCards().then((cardData) => {
  cardSection = new Section(
    {
      items: cardData.reverse(),
      renderer: renderCard,
    },
    cardListSelector
  );
  cardSection.renderItems();
});

//Preview Popup Const

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

/*Event Listeners*/

profileEditButton.addEventListener("click", openProfileForm);
profileCloseButton.addEventListener("click", () => editProfilePopup.close());
addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopup.open();
});
cardCloseButton.addEventListener("click", () => addCardPopup.close());
deletePopupCloseButton.addEventListener("click", () => {
  deleteCardPopup.close();
});
avatarPopupCloseButton.addEventListener("click", () => {
  editAvatarPopup.close();
});
// saveAvatarButton.addEventListener("click", () => {
//   const avatar = document.querySelector("#edit-avatar-input").value;
//   handleEditAvatar(avatar);
// });
