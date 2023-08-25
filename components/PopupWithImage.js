import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._previewModal = document.querySelector("#preview-image-modal");
    this._imgPreview = this._previewModal.querySelector(".modal__image");
    this.imgPreviewTitle = this._previewModal.querySelector(
      ".modal__preview-title"
    );
  }

  open({ link, name }) {
    this._popupElement.querySelector(".modal__preview-title").textContent =
      name;
    const image = this._popupElement.querySelector("#preview-image-modal");
    image.src = link;
    image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
