import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {}
}

// for index.js

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
