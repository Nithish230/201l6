const express = require("express");
const app = express();
var csrf = require("tiny-csrf");
var cookieParser = require("cookie-parser");
const { Todo, User } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
<<<<<<< HEAD
=======
//exporting all the libraries related to level10
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
const bcrypt = require("bcrypt");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStratergy = require("passport-local");

const saltRounds = 10;

app.set("views", path.join(__dirname, "views"));
app.use(flash());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("Some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));

app.use(
  session({
    secret: "my-super-secret-key-2837428907583420",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});

<<<<<<< HEAD
=======
//initializing and session
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStratergy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findOne({ where: { email: username } })
        .then(async (user) => {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
<<<<<<< HEAD
            return done(null, false, { message: "Invalid password" });
          }
        })
        .catch(() => {
          return done(null, false, { message: "Invalid Email-ID" });
=======
            return done(null, false, { message: "Password is invalid!!!" });
          }
        })
        .catch(() => {
          return done(null, false, { message: "EmailID is invalid" });
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
        });
    }
  )
);

<<<<<<< HEAD
passport.serializeUser((user, done) => {
  console.log("Serializing user in session", user.id);
  done(null, user.id);
});

=======
//serializing the user
passport.serializeUser((user, done) => {
  console.log("Serialize use in session", user.id);
  done(null, user.id);
});

//deserializing the user
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

app.set("view engine", "ejs");
<<<<<<< HEAD

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (request, response) {
=======
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (request, response) {
  // response.render("index", {
  //   title: "My Todo Manager",
  //   csrfToken: request.csrfToken(),
  // });
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
  if (request.user) {
    return response.redirect("/todos");
  } else {
    response.render("index", {
<<<<<<< HEAD
      title: "To-Do Manager",
=======
      title: "My Todo Manager",
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
      csrfToken: request.csrfToken(),
    });
  }
});
<<<<<<< HEAD
//Retriving Todo's data
app.get(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    try {
      const loggedIn = request.user.id;
      const userName = request.user.firstName + " " + request.user.lastName;
      const overDue = await Todo.overDue(loggedIn);
      const dueToday = await Todo.dueToday(loggedIn);
      const dueLater = await Todo.dueLater(loggedIn);
      const completedItems = await Todo.completedItems(loggedIn);
      if (request.accepts("html")) {
        response.render("todos", {
          title: "To-Do Manager",
          userName,
          overDue,
          dueToday,
          dueLater,
          completedItems,
          csrfToken: request.csrfToken(),
        });
      } else {
        response.json({
          overDue,
          dueToday,
          dueLater,
          completedItems,
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(422).json(err);
    }
  }
);
//Sign-up
app.get("/signup", (request, response) => {
  response.render("signup", {
    title: "Sign up",
    csrfToken: request.csrfToken(),
  });
});

app.post("/users", async (request, response) => {
  if (!request.body.firstName) {
    request.flash("error", "Please enter your first name");
    return response.redirect("/signup");
  }
  if (!request.body.email) {
    request.flash("error", "Please enter email ID");
    return response.redirect("/signup");
  }
  if (!request.body.password) {
    request.flash("error", "Please enter your password");
    return response.redirect("/signup");
  }
  if (request.body.password < 8) {
    request.flash("error", "Password length should be atleast 8");
=======

app.get("/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    try {
      const userName = request.user.firstName + " " + request.user.lastName;
      const loggedIn = request.user.id;
      const overDue = await Todo.overDue(loggedIn);
      const dueToday = await Todo.dueToday(loggedIn);
      const dueLater = await Todo.dueLater(loggedIn);
      const completedItems = await Todo.completedItemsAre(loggedIn);
      if (request.accepts("html")) {
        response.render("todos", {
          title: "To-Do Manager",
          userName,
          overDue,
          dueToday,
          dueLater,
          completedItems,
          csrfToken: request.csrfToken(),
        });
      } else {
        response.json({
          overDue,dueToday,dueLater,completedItems,
        });
      }
    } catch (err1) {
      console.log(err1);
      return response.status(422).json(err1);
    }
  }
);


//Route for users
app.post("/users", async (request, response) => {
  if (!request.body.firstName) {
    request.flash("error", "Please do enter your first name");
    return response.redirect("/signup");
  }
  if (!request.body.email) {
    request.flash("error", "Please do enter your email ID");
    return response.redirect("/signup");
  }
  if (!request.body.password) {
    request.flash("error", "Please do enter your password");
    return response.redirect("/signup");
  }
  if (request.body.password < 8) {
    request.flash("error", "Length of password should be atleast 8");
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    return response.redirect("/signup");
  }
  const hashedPwd = await bcrypt.hash(request.body.password, saltRounds);
  try {
    const user = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPwd,
    });
<<<<<<< HEAD
    request.login(user, (err) => {
      if (err) {
        console.log(err);
=======
    request.login(user, (err1) => {
      if (err1) {
        console.log(err1);
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
        response.redirect("/");
      } else {
        response.redirect("/todos");
      }
    });
<<<<<<< HEAD
  } catch (error) {
    request.flash("error", error.message);
    return response.redirect("/signup");
  }
});
//Login
app.get("/login", (request, response) => {
  response.render("login", {
    title: "Login",
    csrfToken: request.csrfToken(),
  });
});

app.post(
  "/session",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (request, response) => {
    response.redirect("/todos");
  }
);
//Sign-out
app.get("/signout", (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect("/");
  });
});

// app.get("/todos", async function (_request, response) {
//   console.log("Processing list of all Todos ...");
//   // FILL IN YOUR CODE HERE
//   try {
//     const todos = await Todo.findAll();
//     return response.json(todos);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

app.get(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    try {
      const todo = await Todo.findByPk(request.params.id);
      return response.json(todo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
=======
  } catch (errori) {
    request.flash("error", errori.message);
    return response.redirect("/signup");
  }
});

//Route for login
app.get("/login", (request, response) => {
  response.render("login", {
    title: "Login",
    csrfToken: request.csrfToken(),
  });
});

//Route for signup
app.get("/signup", (request, response) => {
  response.render("signup", {
    title: "Sign up",
    csrfToken: request.csrfToken(),
  });
});

//Route for session

// app.post("/session",
//   passport.render("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   (request, response) => {
//     response.redirect("/todos");
//   }
// );

app.post("/session",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (request, response) => {
    response.redirect("/todos");
  }
);

//Route for signout
app.get("/signout", (req, res, next) => {
  req.logout((err1) => {
    if (err1) {
      return next(err1);
    }
    res.redirect("/");
  });
});

//Not required for this level
app.get("/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    try {
      const todo1 = await Todo.findByPk(request.params.id);
      return response.json(todo1);
    } catch (error2) {
      console.log(error2);
      return response.status(422).json(error2);
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    }
  }
);

<<<<<<< HEAD
app.post(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    if (request.body.title.length < 5) {
      request.flash("error", "Title length should be atleast 5");
      return response.redirect("/todos");
    }
    if (!request.body.dueDate) {
      request.flash("error", "Please select a due date");
      return response.redirect("/todos");
    }
    try {
      await Todo.addTodo({
=======
//Route for todos
app.post("/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    if (request.body.title.length < 5) {
      request.flash("error", "Lenght of title should be atleast 5");
      return response.redirect("/todos");
    }
    if (!request.body.dueDate) {
      request.flash("error", "Please do select a due date");
      return response.redirect("/todos");
    }
    try {
      await Todo.addaTodo({
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
        title: request.body.title,
        dueDate: request.body.dueDate,
        userID: request.user.id,
      });
      return response.redirect("/todos");
<<<<<<< HEAD
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
=======
    } catch (error1) {
      console.log(error1);
      return response.status(422).json(error1);
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    }
  }
);

<<<<<<< HEAD
app.put(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    try {
      const todo = await Todo.findByPk(request.params.id);
      const updatedTodo = await todo.setCompletionStatus(
        request.body.completed
      );
      return response.json(updatedTodo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
=======
//Route for completion status
app.put("/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    // const todo = await Todo.findByPk(request.params.id);
    try {
      const todo = await Todo.findByPk(request.params.id);
      const updatedTodoIs = await todo.setCompletionStatusAs(
        request.body.completed
      );
      return response.json(updatedTodoIs);
    } catch (error1) {
      console.log(error1);
      return response.status(422).json(error1);
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
    }
  }
);

<<<<<<< HEAD
app.delete(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    console.log("We have to delete a Todo with ID: ", request.params.id);
    // FILL IN YOUR CODE HERE
    try {
      const res = await Todo.remove(request.params.id, request.user.id);
      return response.json({ success: res === 1 });
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
    // First, we should query our database to delete a Todo by ID and then we have to respond back with true/false
    // based on whether the Todo was deleted or not.
  }
);

module.exports = app;
=======
//Route for deleting
app.delete("/todos/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, resp) {
    console.log("Delete a todo with a particular id : ", req.params.id);
    // FILL IN YOUR CODE HERE
    try {
      const res = await Todo.remove(req.params.id, req.user.id);
      return res.json({ success: res === 1 });
    } catch (error1) {
      console.log(error1);
      return resp.status(422).json(error1);
    }
  }
);

module.exports = app;
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
