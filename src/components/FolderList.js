import React, { useEffect, useState , useRef } from "react";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import { FaRegFile } from "react-icons/fa6";
import { MdOutlineModeEdit , MdDeleteOutline } from "react-icons/md";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { CgFileAdd } from "react-icons/cg";

const FolderList = ({
  folders,
  onToggle,
 // onSelect,
  selectedFolderId,
  onAddFile,
  onEdit,
  onDelete,
  onAddSubFolder,
}) => {
  const [newFileName, setNewFileName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [subfolderInputId, setSubfolderInputId] = useState(null);
  const [newSubfolderName, setNewSubfolderName] = useState("");
  const [showFileInputId, setShowFileInputId] = useState(null);


  const handleEdit = (id , name) => {
    setEditingId(id);
    setEditingName(name);
  }

  const saveEdit = () =>{
    if(editingId){
        onEdit(editingId , editingName)
        setEditingId(null);
    }
  };

  const handleAddSubfolder = (folderId , subfolderName)=>{
    if(newSubfolderName.trim()){
      onAddSubFolder(folderId, subfolderName);
      setNewSubfolderName("");
      setSubfolderInputId(null)
    }
  }

const handleAddFile = (folderId)=>{
  if(newFileName.trim()){
    onAddFile(folderId, newFileName.trim());
    setNewFileName("");
    setShowFileInputId(null);
  }
};


  const renderFolders = (folders) => {

    return folders.map((folder) => (
      <div key={folder.id} className="ml-2">
        <div
          className={`p-2 cursor-pointer ${
            selectedFolderId === folder.id
              ? "bg-blue-100 border border-blue-300"
              : "hover:bg-gray-100"
          }`}
         
        >
          <div className="flex items-center space-x-2 border px-2 py-1 rounded">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onToggle(folder.id);
              }}
              className="cursor-pointer"
            >
              {folder.collapsed ? (
                <RxCaretRight size={20} />
              ) : (
                <RxCaretDown size={20} />
              )}
            </div>
            {editingId === folder.id ? (
                <input type="text"
                value={editingName}
                onChange={(e)=> setEditingName(e.target.value)}
                className="border rounded p-1"/>
            ) : (
                <p>{folder.name}</p>
            ) }  
             <button
             onClick={(e)=> {
                e.stopPropagation();
                if(editingId === folder.id){
                    saveEdit();
                } else {
                    handleEdit(folder.id , folder.name);
                }
             }}
             className="text-blue-600">
                {editingId === folder.id ? "Save" : <MdOutlineModeEdit />}
                </button>

                {/* delete button */}

                <button onClick={(e)=> {
                    e.stopPropagation();
                    onDelete(folder.id);
                }}
                className="text-blue-600">
                    <MdDeleteOutline />
                </button>
           
              
                <button
                 onClick={(e)=> {
                  e.stopPropagation();
                  //onAddSubFolder(folder.id);
                  setSubfolderInputId(folder.id)
                  setShowFileInputId(null);
                  
                }}
                className="text-blue-600">
                  <HiOutlineFolderAdd /></button>

                  <button 
                  onClick={(e)=> {
                    e.stopPropagation();
                    setShowFileInputId(folder.id);
                    setSubfolderInputId(null);
                  }}
                  className="text-blue-600"
                  ><CgFileAdd /></button>
                  </div>
  
             {subfolderInputId === folder.id && (
            
              <div>            
                <input type="text"
                value={newSubfolderName}
                onChange={(e)=> setNewSubfolderName(e.target.value)}
                className=""/> 

              <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
               onClick={()=> handleAddSubfolder(folder.id)}>
                add 
              </button> 
          
                  </div>
                  
               )}
             
              
            
             
             
           
                  

          {/* Render files in the folder */}
          {!folder.collapsed && (
            <div className="w-full ">
              <div className="items-center ml-4">

                {folder.files.map((file, index) => (
                  <div key={index} 
                  className="flex items-center space-x-2 border  rounded mt-2">                   
                    <FaRegFile size={20} />
                     {editingId === `${folder.id}-file-${index}` ? (
                        <input 
                        type="text"
                        value={editingName}
                        onChange={(e)=> setEditingName(e.target.value)}
                        className="border rounded p-1"
                        /> ) : (
                            <p>{file}</p>
                        )}
                        <button
                        onClick={(e)=> {
                            e.stopPropagation();
                            if(editingId === `${folder.id}-file-${index}`) {
                                saveEdit();
                            } else {
                                handleEdit(`${folder.id}-file-${index}`,file);
                            }
                        }}
                        className="ml-2 text-blue-600 px-2 py-1 rounded text-sm"
                        >
                            {editingId === `${folder.id}-file-${index}`
                            ? "save": <MdOutlineModeEdit /> }

                        </button>

                        <button 
                onClick={(e)=> {
                    e.stopPropagation();
                    onDelete(`${folder.id}-file-${index}`);
                }}
                className="text-blue-600 ">
                    <MdDeleteOutline />
                </button>

                   
                  </div>
                ))}
              </div>

              {/* Input for adding a new file */}
             {showFileInputId === folder.id && (
             <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add file"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="border rounded p-1 text-sm"
                />
                <button
                  onClick={() => handleAddFile(folder.id , newFileName)
                    //e.stopPropagation();
                    //onAddFile(folder.id, newFileName);
                    //setNewFileName("");
                    
                }
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Add File
                </button>
              </div>
                )} 
            </div>
        
          )}

          {/* Render subfolders recursively */}
          {!folder.collapsed && folder.subfolders.length > 0 && (
            <div className="ml-4">
              {renderFolders(folder.subfolders)}</div>
          )}
        </div>
      </div>
    ));
  };

  return <div 
       className="mt-4">
        
        {renderFolders(folders)}</div>;
};

export default FolderList;
