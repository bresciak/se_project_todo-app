class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._render();
  }

  updateCoompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._render();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._render();
  };

  _updateText() {
    this._element.textContent = `Completed: ${this._completed} / Total: ${this._total}`;
  }
}

export default TodoCounter;
