
import type { Task } from "./TaskList";
import Button from "./ui/button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedTitle, setEditedTitle] = useState(task.title);

  function handleEdit(): void {
    setEditedTitle(task.title);
    setIsModalOpen(true);
  }

  function handleClose(): void {
    setIsModalOpen(false);
  }

  function handleSave(): void {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onEdit(task.id, trimmedTitle);

    setIsModalOpen(false);
  }

  return (
    <>
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

      {/* Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
      >
        <h2 className="text-lg font-semibold mb-4">
          Edit Task
        </h2>

        <Input
          id={`edit-task-${task.id}`}
          label="Task Name"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
          placeholder="Enter task name"
        />

        <div className="flex justify-end gap-2 mt-5">

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>

        </div>
      </Modal>
    </>
  );
}

export default TaskItem;
