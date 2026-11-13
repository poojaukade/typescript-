
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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-[10px] max-[650px]:flex-col">
        <input
        className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b] dark:placeholder:text-[#cbd5e1]"
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a new task..."
        />

        <button type="submit" 
        className="border-0 rounded-[7px] px-[18px] py-[11px] bg-[#2563eb] text-white font-semibold whitespace-nowrap hover:bg-[#1d4ed8]"
          >
            Add Task
          </button>
      </div>

      {error && <p className="text-[#dc2626] text-[12px] mt-[6px]">{error}</p>}
    </form>
  );
}

export default TaskForm;
