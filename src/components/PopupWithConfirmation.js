import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteButton = this._popupElement.querySelector(
      ".modal__delete-button"
    );
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  // setLoading(isLoading) {
  //   if (isLoading) {
  //     this._popupForm.textContent = "Saving...";
  //   } else {
  //     this._popupForm.textContent = "Yes"; // or whatever text you want
  //     this._popupForm.reset(); // Reset the form
  //   }
  // }

  _handleSubmit = (event) => {
    event.preventDefault();
    this._handleFormSubmit();
  };

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithConfirmation;
