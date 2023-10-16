import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonText = submitButtonText;
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  setLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._submitButtonText;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
