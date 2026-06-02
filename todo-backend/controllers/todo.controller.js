import Todo from "../models/todo.model.js";

// create notes
export const createTodo = async (req, res) => {
    try {
        const {title} = req.body;
        if(!title){
            return res.status(400).json({
                message: "Title is required"
            })
        }
        const newTodo = await Todo.create({title});
        return res.status(201).json({
            message: "Todo created successfully",
            todo: newTodo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating todo",
            error: error.message
        })
    }
}
// get all todos

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            message: "Todos fetched successfully",
            todos
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        })
    }
} 

// update todo

export const updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const {title} = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {title}, {new: true});
        if(!updatedTodo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        return res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error updating todo",
            error: error.message
        })
    }
}

// delete todo

export const deleteTodo = async (req, res) =>{
    try {
        const {id} = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting todo",
            error: error.message
        })
    }
}

// PENDING AND COMPLETING  TOODS STATUS TOGGLE

export const togleStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        todo.status = todo.status === "pending" ? "completed" : "pending";
        await todo.save();
        return res.status(200).json({
            message: "Todo status toggled successfully",
            todo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error toggling todo status",
            error: error.message
        })
    }
}