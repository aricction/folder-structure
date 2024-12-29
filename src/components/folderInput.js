import React from "react";
import { HiOutlineFolderAdd } from "react-icons/hi";

const FolderInput = ({folderName, onCreate , onChange})=>{
    return(
        <div className="w-full">
            <div className="flex item-center space-x-2">
            <HiOutlineFolderAdd size={20} />
            <input className="border-2 border-blue-500 rounded"
            type="text"
            value={folderName}
            onChange={(e)=> onChange(e.target.value)}
            placeholder="enter folder name"
            />
            <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm " 
            onClick={onCreate}>create</button>
            </div>
            </div>
    )
}

export default FolderInput;