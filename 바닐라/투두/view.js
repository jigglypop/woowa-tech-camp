const getTodoElement = (todo) => {
  const { text, completed } = todo;
  return `
    <li ${completed ? 'class="completed"' : ""}>
      <div class="view">
        <input
        ${completed ? "checked" : ""}
        class="toggle"
        type="checkbox">
        <label>${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}">
    </li>
  `;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  if (length === 1) {
    return "1개 남았습니다.";
  }
  return `${length} 개 남았습니다.`;
};

export const view = (target, state) => {
  const { currentFilter, todos } = state;

  const El = target.cloneNode(true);
  const list = El.querySelector(".todo-list");
  const counter = El.querySelector(".todo-count");
  const filters = El.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);
  Array.from(filters.querySelectorAll("li a")).forEach((item) => {
    if (item.textContent === currentFilter) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
  return El;
};
