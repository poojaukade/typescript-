
import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import StatePlayground from "./components/StatePlayground";
import SearchPanel from "./components/SearchPanel";
import RegistrationForm from "./components/RegistrationForm";
import RecipeApp from "./components/RecipeApp";

// Task type
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn JSX and components", completed: true },
    { id: 2, title: "Practise useState", completed: false },
    { id: 3, title: "Understand map and filter", completed: true },
    { id: 4, title: "Build a registration form", completed: false },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Add a new task
  function handleAddTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  // Mark task as completed or incomplete
  function handleToggleTask(taskId: number): void {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  function handleDeleteTask(taskId: number): void {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  }

  // Edit a task
  function handleEditTask(taskId: number, newTitle: string): void {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle }
          : task
      )
    );
  }

  // Derived values: calculate them from tasks
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = totalTasks - completedTasks;

  // Search filtering
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div  className={`min-h-screen transition-colors duration-200 ${
    darkMode
      ? "dark bg-[#101827] text-[#f1f5f9]"
      : "bg-[#f4f6fa] text-[#172b4d]"
  }`}>
      <Header />

      <main className="w-[calc(100%-32px)] max-w-[1000px] mx-auto my-[35px] max-[650px]:my-5">
        <StatePlayground
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((previous) => !previous)}
        />

        <section
          className={`mb-[25px] rounded-[14px] p-[26px] shadow-[0_4px_18px_rgba(15,23,42,0.05)] ${darkMode
              ? "bg-[#1e293b] text-[#f1f5f9]"
              : "bg-white text-[#172b4d]"
            }`}
        >
          <h2 className="text-[21px] mb-[8px]">My Task Manager</h2>
          <p
            className={`text-[14px] mb-[22px] leading-[1.5] ${darkMode ? "text-[#cbd5e1]" : "text-[#64748b]"
              }`}
          >
            Organise your work and track your progress.
          </p>

          <div className="grid grid-cols-3 gap-[14px] mb-[22px]">
            <div
              className={`rounded-[10px] p-[17px] max-[650px]:p-3 ${darkMode ? "bg-[#334155]" : "bg-[#f1f5f9]"
                }`}
            >
              <span
                className={`text-[13px] ${darkMode ? "text-[#cbd5e1]" : "text-[#64748b]"
                  }`}
              >Total Tasks</span>
              <h3 className="text-[28px] mt-2 max-[650px]:text-[23px]">{totalTasks}</h3>
            </div>

            <div
              className={`rounded-[10px] p-[17px] max-[650px]:p-3 ${darkMode ? "bg-[#334155]" : "bg-[#f1f5f9]"
                }`}
            >
              <span
                className={`text-[13px] ${darkMode ? "text-[#cbd5e1]" : "text-[#64748b]"
                  }`}
              >Completed</span>
              <h3 className="text-[28px] mt-2 max-[650px]:text-[23px]">{completedTasks}</h3>
            </div>

            <div
              className={`rounded-[10px] p-[17px] max-[650px]:p-3 ${darkMode ? "bg-[#334155]" : "bg-[#f1f5f9]"
                }`}
            >
              <span
                className={`text-[13px] ${darkMode ? "text-[#cbd5e1]" : "text-[#64748b]"
                  }`}
              >Remaining</span>
              <h3 className="text-[28px] mt-2 max-[650px]:text-[23px]">{remainingTasks}</h3>
            </div>
          </div>

          <TaskForm onAdd={handleAddTask} />

          <SearchPanel
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />

          <Footer
            totalTasks={totalTasks}
            remainingTasks={remainingTasks}
          />
        </section>

        <RegistrationForm />

        <RecipeApp />
      </main>
    </div>
  );
}

export default App;
