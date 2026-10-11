// В стартовом проекте нет готовой логики домашней работы.
// Спроектируйте модель данных и переходы между состояниями самостоятельно.

console.log("Стартовый проект подключен")
"use strict";

const emptyState = document.querySelector('[data-state-panel="empty"]');
const editorState = document.querySelector('[data-state-panel="editor"]');
const viewerState = document.querySelector('[data-state-panel="viewer"]');
const workspaceStatus = document.querySelector(".workspace__status");

const savedCardTitle = document.querySelector("#saved-card-title");
const savedCardType = document.querySelector("#saved-card-type");
const savedCardDanger = document.querySelector("#saved-card-danger");
const savedCardDescription = document.querySelector("#saved-card-description");

const createButton = document.querySelector('[data-action="create"]');
const cancelButton = document.querySelector('[data-action="cancel"]');
const editButton = document.querySelector('[data-action="edit"]');
const deleteButton = document.querySelector('[data-action="delete"]');

const cardForm = document.querySelector(".card-form");

const STORAGE_KEY = "anomaly-card";
const SESSION_MODE_KEY = "anomaly-mode";
const savedCardJson = localStorage.getItem(STORAGE_KEY);

createButton.addEventListener("click", () => {
    emptyState.hidden = true;
    editorState.hidden = false;

    workspaceStatus.textContent = "Создание карточки";
    sessionStorage.setItem(SESSION_MODE_KEY, "editor");
});

cancelButton.addEventListener("click", () => {
    editorState.hidden = true;
    const storedCardJson = localStorage.getItem(STORAGE_KEY);

    if (storedCardJson) {
        const storedCard = JSON.parse(storedCardJson);

        cardForm.elements.title.value = storedCard.title;
        cardForm.elements.type.value = storedCard.type;
        cardForm.elements.danger.value = storedCard.danger;
        cardForm.elements.description.value = storedCard.description;

        viewerState.hidden = false;
        workspaceStatus.textContent = "Карточка сохранена";
        sessionStorage.setItem(SESSION_MODE_KEY, "viewer");
    } else {
        emptyState.hidden = false;
        cardForm.reset();
        workspaceStatus.textContent = "Карточек еще нет";
        sessionStorage.setItem(SESSION_MODE_KEY, "empty");
    }
});

editButton.addEventListener("click", () => {
    cardForm.elements.title.value = savedCardTitle.textContent;
    cardForm.elements.type.value = savedCardType.textContent;
    cardForm.elements.danger.value = savedCardDanger.textContent;
    cardForm.elements.description.value = savedCardDescription.textContent;

    viewerState.hidden = true;
    editorState.hidden = false;

    workspaceStatus.textContent = "Редактирование карточки";
    sessionStorage.setItem(SESSION_MODE_KEY, "editor");
});

deleteButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    viewerState.hidden = true;
    emptyState.hidden = false;

    cardForm.reset();

    workspaceStatus.textContent = "Карточек еще нет";
    sessionStorage.setItem(SESSION_MODE_KEY, "empty");
});

if (savedCardJson) {
    const savedCard = JSON.parse(savedCardJson);

    savedCardTitle.textContent = savedCard.title;
    savedCardType.textContent = savedCard.type;
    savedCardDanger.textContent = savedCard.danger;
    savedCardDescription.textContent = savedCard.description;

    emptyState.hidden = true;
    editorState.hidden = true;
    viewerState.hidden = false;

    workspaceStatus.textContent = "Карточка сохранена";
    sessionStorage.setItem(SESSION_MODE_KEY, "viewer");
} else {
    workspaceStatus.textContent = "Карточек еще нет";
    sessionStorage.setItem(SESSION_MODE_KEY, "empty");
}

cardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(cardForm);

    const cardData = {
        title: formData.get("title"),
        type: formData.get("type"),
        danger: formData.get("danger"),
        description: formData.get("description"),
    };

    const cardJson = JSON.stringify(cardData);
    localStorage.setItem(STORAGE_KEY, cardJson);

    console.log(cardData);

    savedCardTitle.textContent = cardData.title;
    savedCardType.textContent = cardData.type;
    savedCardDanger.textContent = cardData.danger;
    savedCardDescription.textContent = cardData.description;

    editorState.hidden = true;
    viewerState.hidden = false;

    workspaceStatus.textContent = "Карточка сохранена";

    sessionStorage.setItem(SESSION_MODE_KEY, "viewer");
});