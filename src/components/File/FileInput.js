import React from "react";
import { FaRegFile } from "react-icons/fa6";

const FileInput = ({fileName, onCreate , onChange})=>{
    return(
        <div className="w-full">
            <div className="flex item-center space-x-2">
            <FaRegFile size={20} />
            
            <input className="border-2 border-blue-500 rounded"
            type="text"
            value={fileName}
            onChange={(e)=> onChange(e.target.value)}
            placeholder="enter file name"
            />
            <button className="bg-blue-500 border  rounded " 
            onClick={onCreate}>create</button>
            </div>
            </div>
    )
}

export default FileInput;