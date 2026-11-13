
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

// Component props
type TaskFormProps = {
  onAdd: (task: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedTask = task.trim();

    if (!trimmedTask) {
      setError("Please enter a task.");
      return;
    }

    if (trimmedTask.length < 3) {
      setError("Task must contain at least 3 characters.");
      return;
    }

    onAdd(trimmedTask);

    setTask("");
    setError("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setTask(event.target.value);
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-input-wrapper">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a new task..."
        />

        <button type="submit" className="primary-button">
          + Add Task
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default TaskForm;
