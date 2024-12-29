import React, { useState } from "react";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import { CgFileAdd } from "react-icons/cg";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { FaRegFile } from "react-icons/fa6";

const AddFiles = ({}) => {
  const [files, setFiles] = useState([]); // List of files
  const [folders, setFolders] = useState([]); // List of folders
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [showFileInput, setShowFileInput] = useState(false); // File input visibility
  const [showFolderInput, setShowFolderInput] = useState(false); // Folder input visibility

  const handleCollapseIcon = () => {
    setOpen((prev) => !prev);
  };

  const handleFileAdd = () => {
    setShowFileInput(true);
    setShowFolderInput(false); // Hide folder input
  };

  const handleFolderAdd = () => {
    setShowFolderInput(true);
    setShowFileInput(false); // Hide file input
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleFileCreate = () => {
    if (fileName.trim() !== "") {
      const newFile = { id: Date.now(), name: fileName.trim() };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setFileName("");
      setShowFileInput(false); // Hide file input after creation
    }
  };

  const handleFolderCreate = () => {
    if (folderName.trim() !== "") {
      const newFolder = { id: Date.now(), name: folderName.trim() };
      setFolders((prevFolders) => [...prevFolders, newFolder]);
      setFolderName("");
      setShowFolderInput(false); // Hide folder input after creation
    }
  };

  return (
    <section className="flex flex-col px-4 py-6 border rounded shadow-md w-1/2 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div
            className="cursor-pointer justify-end"
            onClick={handleCollapseIcon}
          >
            {open ? <RxCaretDown size={25} /> : <RxCaretRight size={25} />}
          </div>
          <p>EVALUATION</p>
          <div className="flex items-center space-x-4">
            <button onClick={handleFileAdd}>
              <CgFileAdd size={21} />
            </button>
            <button onClick={handleFolderAdd}>
              <HiOutlineFolderAdd size={22} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="flex flex-col mt-4">
          {/* File Input */}
          {showFileInput && (
            <div className="flex items-center space-x-2 mb-4">
              <FaRegFile size={20} />
              <input
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
                className="border px-2 py-1 text-sm rounded w-full focus:outline-none"
                placeholder="Enter file name"
              />
              <button
                onClick={handleFileCreate}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Create
              </button>
            </div>
          )}

         
          {showFolderInput && (
            <div className="flex items-center space-x-2 mb-4">
              <HiOutlineFolderAdd size={20} />
              <input
                type="text"
                value={folderName}
                onChange={handleFolderNameChange}
                className="border px-2 py-1 text-sm rounded w-full focus:outline-none"
                placeholder="Enter folder name"
              />
              <button
                onClick={handleFolderCreate}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Create
              </button>
            </div>
          )}

          
          <div>
          
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-2 border px-2 py-1 rounded mt-2"
              >
                <FaRegFile size={20} />
                <p>{file.name}</p>
              </div>
            ))}
          </div>


          <div className="mt-4">
            {folders.map((folder) => (
              <div key={folder.id}
                className="flex items-center space-x-2 border px-2 py-1 rounded mt-2"
                onClick={handleCollapseIcon} >
            <div className="cursor-pointer justify-end"
            >
            {open ? <RxCaretRight size={25} /> : <RxCaretDown size={25} />}
          </div>
                <p>{folder.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AddFiles;
