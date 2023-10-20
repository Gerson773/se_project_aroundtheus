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

import {
  settings,
  editFormValidator,
  addFormValidator,
  avatarEditFormValidator,
  addCardModal,
  profileEditButton,
  profileTitle,
  profileDescription,
  addCardFormElement,
  cardListEL,
  popups,
  profileCloseButton,
  cardCloseButton,
  addNewCardButton,
  profileAvatarButton,
  avatarPopupCloseButton,
  profileDescriptionInput,
  profileTitleInput,
  cardTitleInput,
  cardLinkInput,
  avatarElement,
  saveAvatarButton,
  cardSelector,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5c996316-6337-4579-a87d-d8a06991f1d4",
    "Content-Type": "application/json",
  },
});

export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

export const cardListSelector = ".card";

// Likes Api

function handleCardLikeClick(cardId, isLiked, setLikesStatus) {
  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((cardData) => {
        setLikesStatus(cardData.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((cardData) => {
        setLikesStatus(cardData.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Edit Avatar

const editAvatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleEditAvatar,
  "Save"
);

function handleEditAvatar(data) {
  editAvatarPopup.setLoading(true);
  api
    .updateProfileAvatar(data.link)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.setLoading(false, "Saving");
    });
}

editAvatarPopup.setEventListeners();

profileAvatarButton.addEventListener("click", () => {
  avatarEditFormValidator.toggleButtonState();

  editAvatarPopup.open();
});

// User Info + Update Profile

const userInfo = new UserInfo(profileTitle, profileDescription, avatarElement);

function fillProfileForm() {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
}

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function handleProfileEditSubmit(data) {
  editProfilePopup.setLoading(true);
  api
    .updateProfile(data)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });
      fillProfileForm();
      editProfilePopup.close();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    })
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  "Save"
);
editProfilePopup.setEventListeners();

// Add Card APi

function handleAddCardFormSubmit(formValues) {
  addCardPopup.setLoading(true);
  api
    .addCard(formValues)
    .then((res) => {
      renderCard(res, cardListEL);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      addCardPopup.setLoading(false, "Create");
    });
}

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  "Create"
);
addCardPopup.setEventListeners();

function openProfileForm() {
  fillProfileForm();
  editProfilePopup.open();
}

//Delete Card const

function handleDeleteCardClick(cardId, card) {
  deleteCardPopup.setSubmitAction(() => {
    api
      .removeCardOnServer(cardId)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  deleteCardPopup.open();
}

const deleteCardPopup = new PopupWithConfirmation(
  "#card__delete-modal",
  "Deleting..."
);

deleteCardPopup.setEventListeners();

/*Form Validation*/

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
    (cardId) => handleDeleteCardClick(cardId, newCard),
    handleCardLikeClick
  );
  cardSection.addItem(newCard.getView());
};

api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        items: cardData.reverse(),
        renderer: renderCard,
      },
      cardListSelector
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error("Error loading initial cards:", error);
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
