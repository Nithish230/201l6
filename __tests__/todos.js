const request = require("supertest");
const cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");
<<<<<<< HEAD

let server, agent;

=======
//declaring server and agent
let server, agent;
//Declaring function to extract csrf token
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}
<<<<<<< HEAD
//login details
=======
//An arrow function for logging in the agent
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  let csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};
<<<<<<< HEAD

=======
//app name = Todo Application
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });
<<<<<<< HEAD
  //signup details 
  test("Sign up", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "nithish",
      lastName: "g",
      email: "nithish@gmail.com",
      password: "123456",
=======
//a test for signing up
  test("Sign up for todo application", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User A",
      email: "user.a@test.com",
      password: "12345678",
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
      _csrf: csrfToken,
    });
    expect(res.statusCode).toBe(302);
  });
<<<<<<< HEAD
  //signout details
  test("Sign out", async () => {
=======
// a test for signing out
  test("Sign out for todo application", async () => {
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    let res = await agent.get("/todos");
    expect(res.statusCode).toBe(200);
    res = await agent.get("/signout");
    expect(res.statusCode).toBe(302);
    res = await agent.get("/todos");
    expect(res.statusCode).toBe(302);
  });
<<<<<<< HEAD
  //create todo
  test("Create new todo", async () => {
    const agent = request.agent(server);
    await login(agent, "nithish@gmail.com", "123456");
=======
//accessing todos of other users is not possible
  test("a user from one account and access or update the todos of other account", async () => {
    //create UserA account
    let res = await agent.get("/signup");
    let csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User A",
      email: "userA@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });
    //create Todo from UserA account
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const idOfTodoFromUserA = res.id;
    //Signout UserA
    await agent.get("/signout");
    //Create UserB account
    res = await agent.get("/signup");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User B",
      email: "userB@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });
    //Try markAsComplete on UserA Todo from UserB account
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    const markCompleteResponse = await agent
      .put(`/todos/${idOfTodoFromUserA}`)
      .send({
        _csrf: csrfToken,
        completed: true,
      });
    expect(markCompleteResponse.statusCode).toBe(422);
    //Try markAsIncomplete on UserA Todo from UserB account
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    const markIncompleteResponse = await agent
      .put(`/todos/${idOfTodoFromUserA}`)
      .send({
        _csrf: csrfToken,
        completed: false,
      });
    expect(markIncompleteResponse.statusCode).toBe(422);
  });
//deleting the todos of other user is not possible
  test("a user from one account cannot delete the todos of user from another account", async () => {
    //create UserA account
    let res = await agent.get("/signup");
    let csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User C",
      email: "userC@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });
    //create Todo from UserA account
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const idOfTodoFromUserA = res.id;
    //Signout UserA
    await agent.get("/signout");
    //Create UserB account
    res = await agent.get("/signup");
    csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User D",
      email: "userD@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });

    //Try delete on UserA Todo from UserB account
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    const deleteResponse2 = await agent
      .delete(`/todos/${idOfTodoFromUserA}`)
      .send({
        _csrf: csrfToken,
      });
    expect(deleteResponse2.statusCode).toBe(422);
  });

  test("creating a todo and responding to json", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    const res = await agent.get("/todos");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });
<<<<<<< HEAD
  //mark todo
  test("Mark todo as completed (Updating Todo)", async () => {
    const agent = request.agent(server);
    await login(agent, "nithish@gmail.com", "123456");
=======
//todo completed
  test("marking a todo as complete using the given id", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    let res = await agent.get("/todos");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/todos")
      .set("Accept", "application/json");
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueToday.length;
    const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
        completed: true,
      });
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });
<<<<<<< HEAD

  test("Mark todo as incomplete (Updating Todo)", async () => {
    const agent = request.agent(server);
    await login(agent, "nithish@gmail.com", "123456");
    let res = await agent.get("/todos");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy Chocolate",
=======
//todo marked incomplete
  test("marking the todo as incomplete using the given id", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
    let res = await agent.get("/todos");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy chips",
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
      dueDate: new Date().toISOString(),
      completed: true,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/todos")
      .set("Accept", "application/json");
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueToday.length;
    const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
        completed: false,
      });
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(false);
  });
<<<<<<< HEAD

  // test("Fetching all todos in the database", async () => {
  //   const agent = request.agent(server);
  //   await login(agent, "nithish@gmail.com", "123456");
  //   let res = await agent.get("/todos");
  //   let csrfToken = extractCsrfToken(res);
  //   await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //     _csrf: csrfToken,
  //   });

  //   res = await agent.get("/todos");
  //   csrfToken = extractCsrfToken(res);
  //   await agent.post("/todos").send({
  //     title: "Buy ps3",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //     _csrf: csrfToken,
  //   });
  //   const response = await agent.get("/todos");
  //   const parsedResponse = JSON.parse(response.text);

  //   expect(parsedResponse.length).toBe(5);
  //   expect(parsedResponse[4]["title"]).toBe("Buy ps3");
  // });
  //delete todo
  test("Delete todo using ID", async () => {
    const agent = request.agent(server);
    await login(agent, "nithish@gmail.com", "123456");
=======
//todo being deleted
  test("with help of given id trying to delete a todo", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    let res = await agent.get("/todos");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/todos")
      .set("Accept", "application/json");

    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueToday.length;
    const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];

    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);
    //testing for response-true
    const todoID = latestTodo.id;
    const deleteResponse = await agent.delete(`/todos/${todoID}`).send({
      _csrf: csrfToken,
    });
    const parsedDeleteResponse = JSON.parse(deleteResponse.text).success;
    expect(parsedDeleteResponse).toBe(true);
    //testing for response-false
    //as above id is deleted it does not exist
    res = await agent.get("/todos");
    csrfToken = extractCsrfToken(res);

    const deleteResponse2 = await agent.delete(`/todos/${todoID}`).send({
      _csrf: csrfToken,
    });
    const parsedDeleteResponse2 = JSON.parse(deleteResponse2.text).success;
    expect(parsedDeleteResponse2).toBe(false);
  });
});
