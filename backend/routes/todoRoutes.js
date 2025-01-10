const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController")


router.route("/")
      .get(todoController.getAllTodosOfUser)
      .post(todoController.createTodoOfUser)
      .put(todoController.updateTodo)
      .patch(todoController.updateTodoStatus)
      
router.route("/:id")
      .delete(todoController.deleteTodo);
router.route("/completed")
      .get(todoController.getConditionalTodosOfUser);


module.exports = router;