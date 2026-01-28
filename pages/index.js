import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
const todosList = document.querySelector(".todos__list");

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (completed) => {
      console.log("Checked:", completed);
    },
    () => {
      console.log("Deleted");
    },
  );
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

const popupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
  const newTodoData = {
    title: formData.title,
    description: formData.description,
  };

  const todoElement = generateTodo(newTodoData);
  section.addItem(todoElement);
  popupWithForm.close();
});

popupWithForm.setEventListeners();
addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

section.renderItems();
