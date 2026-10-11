// В стартовом проекте нет готовой логики домашней работы.
// Спроектируйте модель данных и переходы между состояниями самостоятельно.

console.log("Стартовый проект подключен")
"use strict";

const emptyState = document.querySelector('[data-state-panel="empty"]');
const editorState = document.querySelector('[data-state-panel="editor"]');
const viewerState = document.querySelector('[data-state-panel="viewer"]');

const savedCardTitle = document.querySelector("#saved-card-title");
const savedCardType = document.querySelector("#saved-card-type");
const savedCardDanger = document.querySelector("#saved-card-danger");
const savedCardDescription = document.querySelector("#saved-card-description");

const createButton = document.querySelector('[data-action="create"]');
const cancelButton = document.querySelector('[data-action="cancel"]');
const editButton = document.querySelector('[data-action="edit"]');

const cardForm = document.querySelector(".card-form");

createButton.addEventListener("click", () => {
    emptyState.hidden = true;
    editorState.hidden = false;
});

cancelButton.addEventListener("click", () => {
    editorState.hidden = true;
    emptyState.hidden = false;
});

editButton.addEventListener("click", () => {
  cardForm.elements.title.value = savedCardTitle.textContent;
  cardForm.elements.type.value = savedCardType.textContent;
  cardForm.elements.danger.value = savedCardDanger.textContent;
  cardForm.elements.description.value = savedCardDescription.textContent;

  viewerState.hidden = true;
  editorState.hidden = false;
});

cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(cardForm);

    const cardData = {
        title: formData.get("title"),
        type: formData.get("type"),
        danger: formData.get("danger"),
        description: formData.get("description"),
    };

    console.log(cardData);

    savedCardTitle.textContent = cardData.title;
    savedCardType.textContent = cardData.type;
    savedCardDanger.textContent = cardData.danger;
    savedCardDescription.textContent = cardData.description;

    editorState.hidden = true;
    viewerState.hidden = false;
});