const request = require("supertest");
let cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;

const extractCsrfToken = (res) => {
  var $ = cheerio.load(res.text);
  return $("[name = _csrf]").val();
};
describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
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

  test("New todo being created", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });

  test("marking todo as complete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");
    
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    
    const dueTodayCount = parsedGroupedResponse.dueToday.length;
    const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
      });

    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(false);
  });
  test("todo being marked incomplete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy Chocolate",
      dueDate: new Date().toISOString(),
      completed: true,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");
    
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    
    const completedItemsIsCount = parsedGroupedResponse.dueToday.length;
   
    const latestTodo =
      parsedGroupedResponse.dueToday[completedItemsIsCount - 1];
    const completedStatus = !(latestTodo.completed);
    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}`)
      .send({
        _csrf: csrfToken,
        completed: completedStatus,
      });

    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });

  test("Todo's being fetched from the database", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy ps3",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const response = await agent.get("/todos");
    const parsedResponse = JSON.parse(response.text);

    expect(parsedResponse.length).toBe(5);
    expect(parsedResponse[4]["title"]).toBe("Buy ps3");
  });

  test("Todo's being deleted using ID", async () => {
    // FILL IN YOUR CODE HERE
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Go to shopping",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueToday.length;
    const latestTodo = parsedGroupedResponse.dueToday[dueTodayCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const deletedResponse = await agent
      .delete(`/todos/${latestTodo.id}`)
      .send({ _csrf: csrfToken });
    const parsedDeletedResponse = JSON.parse(deletedResponse.text);

    expect(parsedDeletedResponse).toBe(true);
  });
});