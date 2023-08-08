export function openPopup(popup) {
  const previewImageModal = this._cardElement.querySelector(
    "#preview-image-modal"
  );
  const imgEL = this._cardElement.querySelector(".modal__image");
  const previewText = this._cardElement.querySelector(".modal__preview-title");
  const cardImageEl = this._cardElement.querySelector(".card__image");

  popup.classList.add("modal_opened");
  document.addEventListener("keydown", escapePopup);
}

export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapePopup);
}

export function handleClosePopupWithOutsideClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopup(evt.currentTarget);
  }
}

export function escapePopup(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}
