API Endpoints

1-Create a New TODO
URL: http://localhost:8080/api/todos
Method: POST
body:{
  "title": "Your TODO title",
  "description": "Your TODO description",
  "completed": false
}

2-Get All TODOs
URL: http://localhost:8080/api/todos
Method: GET

3-Get a Single TODO by ID
URL: http://localhost:8080/api/todos/:id
Method: GET

4-Update a TODO by ID
URL: http://localhost:8080/api/todos/:id
Method: PUT

5-Delete a TODO by ID
URL: http://localhost:8080/api/todos/:id

to open it in the browser:
http://localhost:8080/home.html
