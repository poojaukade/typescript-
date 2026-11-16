
import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "./ui/button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

// Component props
type StatePlaygroundProps = {
  darkMode: boolean;
  onToggleTheme: () => void;
};

// Array item type
type Item = {
  id: number;
  name: string;
};

function StatePlayground({ darkMode, onToggleTheme }: StatePlaygroundProps) {
  const [count, setCount] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(true);

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
  ]);

  const [newItem, setNewItem] = useState<string>("");

  // Modal state
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editedItemName, setEditedItemName] = useState<string>("");

  // Add item using spread
  function handleAddItem(): void {
    const trimmedItem = newItem.trim();

    if (!trimmedItem) return;

    const item: Item = {
      id: Date.now(),
      name: trimmedItem,
    };

    setItems((previousItems) => [...previousItems, item]);
    setNewItem("");
  }

  // Delete item using filter
  function handleDeleteItem(itemId: number): void {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== itemId)
    );
  }

  // Edit item using Modal
  function handleEditItem(itemId: number): void {
    const selectedItem = items.find((item) => item.id === itemId);

    if (!selectedItem) return;

    setEditingItem(selectedItem);
    setEditedItemName(selectedItem.name);
  }

  // Close Modal
  function handleClose(): void {
    setEditingItem(null);
    setEditedItemName("");
  }

  // Save edited item
  function handleSave(): void {
    const trimmedName = editedItemName.trim();

    if (!trimmedName || !editingItem) return;

    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === editingItem.id
          ? { ...item, name: trimmedName }
          : item
      )
    );

    handleClose();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewItem(event.target.value);
  }

  return (
    <section
      className={`mb-[25px] rounded-[14px] p-[26px] shadow-[0_4px_18px_rgba(15,23,42,0.05)] ${
        darkMode
          ? "bg-[#1e293b] text-[#f1f5f9]"
          : "bg-white text-[#172b4d]"
      }`}
    >
      <div className="section-heading">
        <div>
          <h2 className="text-[21px] mb-[8px]">State Playground</h2>
          <p className="text-[#64748b] text-[14px] mb-[22px] leading-[1.5]">
            Practise React state with interactive examples.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        {/* Counter */}
        <div
          className={`border rounded-[10px] p-[18px] ${
            darkMode
              ? "border-[#475569]"
              : "border-[#e2e8f0]"
          }`}
        >
          <h3 className="text-[16px] mb-[15px]">Counter</h3>

          <div className="text-[35px] font-bold mb-[15px]">{count}</div>

          <div className="flex flex-wrap gap-[7px]">
            <button
              type="button"
              className="border-0 bg-[#eaf0ff] text-[#2454b8] rounded-[6px] px-3 py-2 text-[13px] font-semibold hover:bg-[#dce7ff]"
              onClick={() => setCount((prev) => (prev === 0 ? 0 : prev - 1))}
            >
              −
            </button>

            <button
              type="button"
              className="border-0 bg-[#eaf0ff] text-[#2454b8] rounded-[6px] px-3 py-2 text-[13px] font-semibold hover:bg-[#dce7ff]"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>

            <button
              type="button"
              className="border-0 bg-[#eaf0ff] text-[#2454b8] rounded-[6px] px-3 py-2 text-[13px] font-semibold hover:bg-[#dce7ff]"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Show / Hide */}
        <div
          className={`border rounded-[10px] p-[18px] ${
            darkMode
              ? "border-[#475569]"
              : "border-[#e2e8f0]"
          }`}
        >
          <h3 className="text-[16px] mb-[15px]">Show / Hide</h3>

          <button
            type="button"
            className="border-0 bg-[#eaf0ff] text-[#2454b8] rounded-[6px] px-3 py-2 text-[13px] font-semibold hover:bg-[#dce7ff]"
            onClick={() => setShowMessage((prev) => !prev)}
          >
            {showMessage ? "Hide Message" : "Show Message"}
          </button>

          {showMessage && (
            <p className="text-[#15803d] text-[13px] mt-[10px]">
              React state controls this message!
            </p>
          )}
        </div>

        {/* Theme */}
        <div
          className={`border rounded-[10px] p-[18px] ${
            darkMode
              ? "border-[#475569]"
              : "border-[#e2e8f0]"
          }`}
        >
          <h3 className="text-[16px] mb-[15px]">Theme Switch</h3>

          <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>

          <button
            type="button"
            className="border-0 bg-[#eaf0ff] text-[#2454b8] rounded-[6px] px-3 py-2 text-[13px] font-semibold hover:bg-[#dce7ff]"
            onClick={onToggleTheme}
          >
            Switch Theme
          </button>
        </div>

        {/* Array state */}
        <div
          className={`border rounded-[10px] p-[18px] ${
            darkMode
              ? "border-[#475569]"
              : "border-[#e2e8f0]"
          }`}
        >
          <h3 className="text-[16px] mb-[15px]">Array State Practice</h3>

          <div className="flex gap-3 mb-3 items-end">
            <Input
              id="new-item"
              label="New Item"
              value={newItem}
              onChange={handleInputChange}
              placeholder="Enter item name"
            />

            <Button
              variant="primary"
              size="medium"
              className="shrink-0 self-end"
              onClick={handleAddItem}
            >
              Add
            </Button>
          </div>

          {items.map((item) => (
            <div
              className="flex items-center justify-between gap-[10px] border-t border-[#e2e8f0] py-[10px] text-sm"
              key={item.id}
            >
              <span>{item.name}</span>

              <div className="flex flex-wrap gap-[7px]">
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleEditItem(item.id)}
                >
                  Edit
                </Button>

                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {/* Edit Item Modal */}
          <Modal
            isOpen={editingItem !== null}
            onClose={handleClose}
          >
            <h2 className="text-lg font-semibold mb-4">
              Edit Item
            </h2>

            <Input
              id="edit-item"
              label="Item Name"
              value={editedItemName}
              onChange={(event) => setEditedItemName(event.target.value)}
              placeholder="Enter updated item name"
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
        </div>
      </div>
    </section>
  );
}

export default StatePlayground;
