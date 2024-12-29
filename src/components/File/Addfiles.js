import React, { useState } from "react";
import FileInput from "./FileInput";
import FileList from "./FileList";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlineModeEdit } from "react-icons/md";


const AddFile = ({ files, setFiles }) => {
  const [fileName, setFileName] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileAdd = () => setShowFileInput((prev) => !prev);

  const handleFileCreate = () => {
    if (fileName.trim() !== "") {
      setFiles((prevFiles) => [...prevFiles, 
        { id: Date.now(), name: fileName.trim() }]);
      setFileName("");
      setShowFileInput(false);
    }
  };

  return (
    <div className="m-4">
      <div className="flex items-center ">
        <button onClick={handleFileAdd} className="flex items-center ">
          <CgFileAdd size={21} />
        </button>
      </div>
      {/* {showFileInput && (
        <FileInput
          fileName={fileName}
          onChange={setFileName}
          onCreate={handleFileCreate}
        />
      )} */}
     
    </div>
  );
};

export default AddFile;
