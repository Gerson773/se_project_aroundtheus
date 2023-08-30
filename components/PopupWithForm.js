import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".modal__form");
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelector(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListeners("submit", () => {
      this.handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;
