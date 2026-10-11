// В стартовом проекте нет готовой логики домашней работы.
// Спроектируйте модель данных и переходы между состояниями самостоятельно.

console.log("Стартовый проект подключен")
"use strict";

const emptyState = document.querySelector('[data-state-panel="empty"]');
const editorState = document.querySelector('[data-state-panel="editor"]');


const createButton = document.querySelector('[data-action="create"]');
const cancelButton = document.querySelector('[data-action="cancel"]');

const cardForm = document.querySelector(".card-form");

createButton.addEventListener("click", () => {
    emptyState.hidden = true;
    editorState.hidden = false;
});

cancelButton.addEventListener("click", () => {
    editorState.hidden = true;
    emptyState.hidden = false;
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
});