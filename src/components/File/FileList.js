import React, { useState } from "react";
import { FaRegFile } from "react-icons/fa6";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";

const FileList = ({ files, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = () => {
    if (editingId) {
      onEdit(editingId, editingName); 
      setEditingId(null); // Reset edit mode
    }
  };

  return (
    <div>
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center space-x-2 border px-2 py-1 rounded mt-2"
        >
          <FaRegFile size={20} />
          {/* Edit mode */}
          {editingId === file.id ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="border rounded p-1"
            />
          ) : (
            <p>{file.name}</p> // Display file name
          )}

          {/* Edit Button */}
          <button
            onClick={() => {
              if (editingId === file.id) {
                saveEdit();
              } else {
                handleEdit(file.id, file.name);
              }
            }}
            className="items-end ml-2 text-blue-600 px-2"
          >
            {editingId === file.id ? "Save" : <MdOutlineModeEdit />}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(file.id)}
            className="ml-2 text-blue-600"
          >
            <MdDeleteOutline />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;
