import React, { useState } from "react";
import FolderInput from "./folderInput";
import FolderList from "./FolderList";
import { HiOutlineFolderAdd } from "react-icons/hi";


const AddFolder = ({folders , setFolders, onClick})=>{
    const[folderName , setFolderName] = useState("");
    // const[showFolderInput , setShowFolderInput] = useState(false);

    // const handleFolderAdd = ()=>{
    //     setShowFolderInput((prev)=> !prev);
    // }

    const handleFolderCreate  = ()=>{
        if(folderName.trim() !== ""){
            setFolders((prev)=> [...prev ,
                {id: Date.now(),
                name:folderName.trim(),
                collapsed:false
                },
            ]);

            setFolderName("");
            //setShowFolderInput(false);

        }
    }

    const toggleFolderCollapse = (folderId) =>{
        setFolders((prev)=>
        prev.map((folder)=>
        folder.id === folderId ? {...folder, collapsed: !folder.collapsed }:folder))
    }
    return (
        <div className="flex items-center space-x-4" >
            <div className="flex items-center space-x-4"> 
                <button>
                    <HiOutlineFolderAdd size={22}/>
                </button>
            </div>
            {/* {showFolderInput && (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
               <FolderInput 
                folderName={folderName}
                onChange = {setFolderName}
                onCreate = {handleFolderCreate} /> 
                </div>
                </div> 
            )}*/}

          
        </div>
    )
}

export default AddFolder;