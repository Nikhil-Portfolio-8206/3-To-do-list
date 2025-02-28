const input = document.getElementById('taskInput');
    const button = document.getElementById('addButton');
    const list = document.getElementById('taskList');

    let draggedItem = null;
    let placeholder = null;

    button.addEventListener('click', () => {
        const taskText = input.value;
        if (taskText !== '') {
            const li = document.createElement('li');
            li.draggable = true;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    li.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                }
            });

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.addEventListener('click', () => {
                list.removeChild(li);
            });

            li.append(checkbox, taskContent, deleteButton);
            list.appendChild(li);

            addDragAndDrop(li);

            input.value = '';
        }
    });

    function addDragAndDrop(item) {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            item.classList.add('dragging');

            // Create placeholder
            placeholder = document.createElement('li');
            placeholder.className = 'placeholder';
            list.insertBefore(placeholder, item.nextSibling);
        });

        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            placeholder.replaceWith(draggedItem);
            placeholder = null;
            draggedItem = null;
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingOver = e.target.closest('li');
            if (draggingOver && draggingOver !== draggedItem) {
                const rect = draggingOver.getBoundingClientRect();
                const offset = e.clientY - rect.top;

                // Adjust placeholder position dynamically
                if (offset > rect.height / 2) {
                    list.insertBefore(placeholder, draggingOver.nextSibling);
                } else {
                    list.insertBefore(placeholder, draggingOver);
                }
            }
        });

        item.addEventListener('drop', () => {
            placeholder.replaceWith(draggedItem);
            draggedItem = null;
        });
    }