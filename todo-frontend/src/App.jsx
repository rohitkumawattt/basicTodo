import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  

  const addTodo = () => {
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, text: editText }
          : todo
      )
    );

    setEditId(null);
    setEditText("");
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Todo App
        </h1>

        {/* <p className="text-center text-gray-500 mb-8">
          Organize your daily tasks efficiently
        </p> */}

        {/* Stats
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">
            <span className="font-semibold">Total:</span> {todos.length}
          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">
            <span className="font-semibold">Pending:</span>{" "}
            {pendingTodos.length}
          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">
            <span className="font-semibold">Completed:</span>{" "}
            {completedTodos.length}
          </div>
        </div> */}

        {/* Add Task */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Pending Tasks ({pendingTodos.length})
            </h2>

            {pendingTodos.length === 0 ? (
              <div className="bg-white rounded-xl p-5 border text-center text-gray-500">
                No pending tasks
              </div>
            ) : (
              pendingTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition mb-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className="w-7 h-7 rounded-full border-2 border-blue-500"
                    ></button>

                    <div>
                      {editId === todo.id ? (
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        <>
                          <p className="text-slate-800 font-medium">
                            {todo.text}
                          </p>

                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {editId === todo.id ? (
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(todo)}
                        className="bg-yellow-500 text-white p-3 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                    )}

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white p-3 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Completed Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Completed Tasks ({completedTodos.length})
            </h2>

            {completedTodos.length === 0 ? (
              <div className="bg-white rounded-xl p-5 border text-center text-gray-500">
                No completed tasks
              </div>
            ) : (
              completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition mb-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center"
                    >
                      <FaCheck />
                    </button>

                    <div>
                      <p className="line-through text-gray-500">
                        {todo.text}
                      </p>

                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        Completed
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white p-3 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;