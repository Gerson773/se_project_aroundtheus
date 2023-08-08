export function openPopup(popup) {
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
