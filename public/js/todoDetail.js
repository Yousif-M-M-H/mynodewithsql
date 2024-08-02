$(document).ready(function () {
    // Function to fetch the todo details
    function fetchTodoDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const todoId = urlParams.get('id');

        if (todoId) {
            fetch(`/api/todos/${todoId}`)
                .then(response => response.json())
                .then(todo => {
                    $('#todo-title').text(todo.title);
                    $('#todo-description').text(todo.description);
                    $('#todo-completed').text(todo.completed ? 'Yes' : 'No');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error fetching TODO details');
                });
        } else {
            alert('No TODO ID provided');
        }
    }

    fetchTodoDetails();
});
