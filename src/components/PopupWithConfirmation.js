import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, submitSave) {
    const buttonText = isLoading ? "Deleting..." : submitSave;
    this._popupForm.querySelector(".modal__button").textContent = buttonText;
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}

export default PopupWithConfirmation;
