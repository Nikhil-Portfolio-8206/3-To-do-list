const input = document.getElementById('taskInput');
const button = document.getElementById('addButton');
const list = document.getElementById('taskList');

button.addEventListener('click', () => {
  const taskText = input.value;
  if (taskText !== '') {
    const li = document.createElement('li');
    li.textContent = taskText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });

    li.prepend(checkbox); 
    list.appendChild(li);
    input.value = '';
  }
});