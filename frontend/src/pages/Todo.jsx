import React, { useEffect, useState } from 'react';
import { useTodo } from '../store/Todostore';
import { Trash2 } from 'lucide-react';

const Home = () => {
  const {
    todos,
    formData,
    setFormData,
    fetchTodos,
    addTodo,
    deleteTodo,
    editTodoId,
    setEditTodoId,
    updateTodo,
    loading,
  } = useTodo();

  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  // Reset completion map when todos change
  useEffect(() => {
    const map = {};
    todos.forEach((t) => {
      map[t.id] = false;
    });
    setCompletedMap(map);
  }, [todos]);

  const handleCheckboxChange = (id) => {
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (e) => {
    setFormData({ description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodoId) {
      updateTodo();
    } else {
      addTodo(e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-20 px-4">
      {/* Input Form */}
      <div className="w-full max-w-xl bg-base-100 shadow-lg p-6 rounded-xl">
        <h2 className="text-3xl font-extrabold mb-4 text-center">
          {editTodoId ? 'Edit Todo' : 'Create Todo'}
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your task..."
            className="textarea textarea-info textarea-lg w-full mb-4"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {editTodoId ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>
      </div>

      {/* Todos List */}
      <div className="w-full max-w-xl h-[500px] mt-10 overflow-y-auto px-2">
        <h3 className="text-xl font-semibold mb-4 text-primary">Your Todos:</h3>
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos found.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-neutral text-neutral-content px-6 py-2 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={completedMap[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="checkbox checkbox-success"
                  />
                  <span
                    className={`text-lg ${
                      completedMap[item.id] ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.description}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditTodoId(item.id);
                      setFormData({ description: item.description });
                    }}
                    className="btn btn-warning btn-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className="btn btn-error btn-xs"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
