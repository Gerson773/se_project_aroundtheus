import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector("#modal__image");
  }

  open(name, link) {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._previewText.textContent = this._name;
    super.open();
  }
}

export default PopupWithImage;
