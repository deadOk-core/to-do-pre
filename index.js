let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  let savedTasks = localStorage.getItem("tasks"); /*Получение данных из локального хранилища*/
  if (savedTasks !== null) {
    return JSON.parse(savedTasks); /*преобразование JSON-строки в JavaScript-объект*/
  }
  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    items = getTasksFromDOM();
  });

  duplicateButton.addEventListener("click", () => {
    let itemName = textElement.textContent;
    let newItem = createItem(itemName);
    listElement.prepend(newItem);
    let items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    let items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

/*Собирает список задач из текущей разметки*/
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach(function (item) {
    tasks.push(item.textContent);
  });
  return tasks;
}

/*Сохраняет в локальное хранилище*/
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(function (item) {
  let listItem = createItem(item);
  listElement.append(listItem);
});

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let task = inputElement.value;
  /*Добавляем в начало*/
  listElement.prepend(createItem(task));
  items = getTasksFromDOM();
  saveTasks(items);
  formElement.reset();
});
