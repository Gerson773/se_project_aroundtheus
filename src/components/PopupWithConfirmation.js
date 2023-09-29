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

  // _handleSubmit() {
  //   e.preventDefault();
  //   this._handleDeleteSubmit();
  // }

  close() {
    super.close();
    // this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}

export default PopupWithConfirmation;
