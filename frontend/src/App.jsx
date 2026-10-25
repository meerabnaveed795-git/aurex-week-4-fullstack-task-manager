
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const API = "http://localhost:5000";

  async function handleAuth(e) {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint =
        page === "register" ? "/api/auth/register" : "/api/auth/login";

      const body =
        page === "register"
          ? { name, email, password }
          : { email, password };

      const response = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setMessage(data.message || "Success!");
      await loadTasks(data.token);
      setPage("dashboard");
    } catch (error) {
      setMessage(error.message || "Unable to connect to backend");
    }
  }

  async function loadTasks(authToken = token) {
    try {
      const response = await fetch(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load tasks");
      }

      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (error) {
      setMessage(error.message || "Could not load tasks");
    }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: "",
          priority: "medium",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add task");
      }

      setTitle("");
      setMessage("Task added successfully!");
      await loadTasks();
    } catch (error) {
      setMessage(error.message || "Could not add task");
    }
  }
  function startEditing(task) {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setMessage("");
  }

  function cancelEditing() {
    setEditingTaskId(null);
    setEditTitle("");
  }

  async function saveEdit(id) {
    if (!editTitle.trim()) {
      setMessage("Task title cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${API}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not edit task");
      }

      setEditingTaskId(null);
      setEditTitle("");
      await loadTasks();
      setMessage("Task updated successfully!");
    } catch (error) {
      setMessage(error.message || "Could not edit task");
    }
  }
  async function toggleTask(task) {
    try {
      const response = await fetch(`${API}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update task");
      }

      await loadTasks();
      setMessage("Task updated successfully!");
    } catch (error) {
      setMessage(error.message || "Could not update task");
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete task");
      }

      await loadTasks();
      setMessage("Task deleted successfully!");
    } catch (error) {
      setMessage(error.message || "Could not delete task");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
    setPassword("");
    setMessage("");
    setPage("login");
  }

  if (page !== "dashboard") {
    return (
      <main className="auth-page">
        <form className="auth-card" onSubmit={handleAuth}>
          <h1>TaskFlow</h1>
          <p>Manage your work, one task at a time.</p>
          <h2>{page === "register" ? "Create account" : "Welcome back"}</h2>

          {page === "register" && (
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (at least 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit">
            {page === "register" ? "Register" : "Login"}
          </button>

          {message && <p className="message">{message}</p>}

          <p className="switch-page">
            {page === "register"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setMessage("");
                setPage(page === "register" ? "login" : "register");
              }}
            >
              {page === "register" ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </main>
    );
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  return (
    <main className="dashboard">
      <header className="topbar">
        <h1>TaskFlow</h1>
        <button className="logout" onClick={logout}>Logout</button>
      </header>

      <section className="welcome">
        <h2>Your Task Dashboard</h2>
        <p>Stay organized and keep moving forward.</p>
      </section>

      <form className="add-task" onSubmit={addTask}>
        <input
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">+ Add Task</button>
      </form>

      {message && <p className="message">{message}</p>}

      <section className="task-list">
        <h3>My Tasks ({tasks.length})</h3>
        <div className="task-filters">
          <button
            type="button"
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            type="button"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <p>No tasks found for this filter!</p>
        ) : (
          filteredTasks.map((task) => (
            <article className="task-item" key={task._id}>
              <div>
                {editingTaskId === task._id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEdit(task._id);
                    }}
                  >
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                      autoFocus
                    />

                    <button type="submit">Save</button>

                    <button type="button" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h4 className={task.completed ? "completed" : ""}>
                      {task.title}
                    </h4>
                    <p>{task.description || "No description"}</p>
                    <small>Priority: {task.priority || "medium"}</small>
                  </>
                )}
              </div>

              <div className="task-actions">
                <button onClick={() => toggleTask(task)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => startEditing(task)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
