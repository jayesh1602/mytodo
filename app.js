const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// for using css files
app.use(express.static("public"));

// settin view engine to ejs
app.set("view engine", "ejs");

// var newTodo = ["eating food", "grocerries"];

mongoose.connect(
  "mongodb+srv://jayesh1602:jayesh1234@cluster0.gxmvk.mongodb.net/TodoNew"
);

const ItemSchema = {
  name: String,
};

const Item = mongoose.model("TodoItem", ItemSchema);

const item1 = new Item({
  name: "eating an apple",
});

const item2 = new Item({
  name: "eating banana ",
});

const defaultArr = [item1, item2];

app.get("/", (req, res) => {
  Item.find({}, function (err, data) {
    //for not inserting data repetively.
    if (data.length === 0) {
      Item.insertMany(defaultArr, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("all data inserted..");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newTodo: data });
    }
  });
});

//dynamic routes in express
app.get("/:customList", (req, res) => {
  const dynamicRoute = req.params.customList;
  console.log(dynamicRoute);
});

app.post("/", (req, res) => {
  const itemName = req.body.inputTodo;

  // adding new data into the list
  const item3 = new Item({
    name: itemName,
  });
  item3.save();
  // res.render("list", { newTodo: newTodo });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const checkdoff = req.body.checkbox;
  console.log(checkdoff);

  //for removing an list by its id
  Item.findByIdAndRemove(checkdoff, function (err) {
    if (!err) {
      console.log("removed success...");
      res.redirect("/");
    }
  });
});
app.listen(3000, () => {
  console.log("listening at 3000 port");
});

// <% for(var i=0;i<newTodo.length;i++){ %>
//   <div class="item">
//       <input type="checkbox" autocomplete="off">

//       <p>
//           <%= newTodo[i] %>
//       </p>
//   </div>

// <% } %>
