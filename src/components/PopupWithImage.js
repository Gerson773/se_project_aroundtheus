import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._previewText = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._previewText.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
