import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._deleteButton = this._popupElement.querySelector(
      ".modal__delete-button"
    );
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading) {
    this._deleteButton.textContent = isLoading ? "Loading..." : "Yes";
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this._handleFormSubmit;
  }

  close() {
    super.close();
    this._deleteButton.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("submit", this._handleFormSubmit);
  }
}

export default PopupWithConfirmation;
