$(document).ready(function () {
  function fetchTodos() {
      fetch('/api/todos')
          .then(response => response.json())
          .then(data => {
              let todoTableBody = $('#todo-table-body');
              todoTableBody.empty(); 
              data.forEach(todo => {
                  let todoRow = `
                      <tr>
                          <td><a href="todoDetail.html?id=${todo.id}" class="text-decoration-none">${todo.title}</a></td>
                          <td>${todo.description}</td>
                          <td>${todo.completed ? 'Yes' : 'No'}</td>
                          <td>
                              <button class="btn btn-primary btn-sm update-btn" data-id="${todo.id}" data-toggle="modal" data-target="#updateTodoModal">Update</button>
                              <button class="btn btn-danger btn-sm delete-btn" data-id="${todo.id}">Delete</button>
                          </td>
                      </tr>
                  `;
                  todoTableBody.append(todoRow);
              });
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error fetching TODOs');
          });
  }

  fetchTodos();

  
  $('#add-todo-form').submit(function (event) {
      event.preventDefault();
      const title = $('#title').val();
      const description = $('#description').val();
      const completed = $('#completed').val() === 'true';

      const newTodo = { title, description, completed };

      fetch('/api/todos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo)
      })
          .then(response => response.json())
          .then(data => {
              fetchTodos(); 
              $('#add-todo-form')[0].reset(); 
              $('#addTodoModal').modal('hide'); 
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error adding TODO');
          });
  });

  $('#todo-table-body').on('click', '.delete-btn', function () {
      let todoId = $(this).data('id');
      if (todoId) {
          fetch('/api/todos/' + todoId, { method: 'DELETE' })
              .then(response => response.json())
              .then(data => {
                  if (data.message === 'Todo is deleted') {
                      fetchTodos(); 
                  } else {
                      alert('Error deleting TODO');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('Error deleting TODO');
              });
      }
  });

  $('#todo-table-body').on('click', '.update-btn', function () {
      let todoId = $(this).data('id');
      if (todoId) {
          fetch('/api/todos/' + todoId)
              .then(response => response.json())
              .then(todo => {
                  $('#update-id').val(todo.id);
                  $('#update-title').val(todo.title);
                  $('#update-description').val(todo.description);
                  $('#update-completed').val(todo.completed ? 'true' : 'false');
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('Error fetching TODO');
              });
      }
  });

  $('#update-todo-form').submit(function (event) {
      event.preventDefault();
      const id = $('#update-id').val();
      const title = $('#update-title').val();
      const description = $('#update-description').val();
      const completed = $('#update-completed').val() === 'true';

      const updatedTodo = { title, description, completed };

      fetch('/api/todos/' + id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTodo)
      })
          .then(response => response.json())
          .then(data => {
              $('#updateTodoModal').modal('hide'); 
              fetchTodos(); 
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error updating TODO');
          });
  });
});
