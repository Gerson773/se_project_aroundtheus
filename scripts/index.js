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

/*Elements*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".card");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Buttons Elements */
const profileCloseButton = document.querySelector("#profile-close-button");
const cardCloseButton = document.querySelector("#card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");

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

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData, cardListEL) {
  const cardElement = getCardElement(cardData);
  cardListEL.prepend(cardElement);
}
/*Event Handlers*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEL);
  closePopup();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});

profileCloseButton.addEventListener("click", closePopup);

addNewCardButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  addCardModal.classList.add("modal_opened");
});

cardCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEL));
