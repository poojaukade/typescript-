
import type { Task } from "./TaskList";
import Button from "./ui/button";

// Component props
type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string) => void;
};

function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {

  function handleEdit(): void {
    const newTitle = window.prompt(
      "Edit your task:",
      task.title
    );

    if (newTitle === null) return;

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) return;

    onEdit(task.id, trimmedTitle);
  }

  return (
    <div className="flex items-center justify-between gap-3 px-1 py-[15px] border-b border-[#e2e8f0] dark:border-[#475569]">

      <label className="flex items-center gap-[10px] min-w-0 cursor-pointer">

        <input
          type="checkbox"
          className="!w-[17px] !h-[17px] !p-0 shrink-0 accent-[#2563eb]"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          className={`[overflow-wrap:anywhere] ${task.completed
              ? "line-through text-[#94a3b8]"
              : ""
            }`}
        >
          {task.title}
        </span>

      </label>

      <div className="flex gap-[7px] shrink-0 max-[650px]:flex-col">


        <Button
          variant="secondary"
          size="small"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>

      </div>

    </div>
  );
}

export default TaskItem;
