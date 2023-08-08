class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputEls = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._form = formElement;
  }

  _showInputError(inputEls) {
    const errorMessageEl = this.formElement.querySelector(
      `#${inputEls.id}-error`
    );
  }

  _hideInputError(inputEls) {
    errorMessageEl.textContent = inputEls.validationMessage;
  }

  _checkFormValidity() {
    return this._inputEls.every((input) => input.validity.valid);
  }

  _checkInputValidity() {
    if (!inputEls.validity.valid) {
      this._showInputError(inputEls);
    } else {
      this._hideInputError(inputEls);
    }
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(
        this._submitButtonSelector,
        this._inactiveButtonClass
      );
      return;
    }

    this._enableButton(this._submitButtonSelector, this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this.form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this.form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this.form, inputEl, options);
        toggleButtonState(inputEl, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, this.settings);
  }
}

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export default FormValidator;
