import AddFolder from "./components/AddFolder";
import FolderList from "./components/FolderList";
import { useState } from "react";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import FolderInput from "./components/folderInput";
import AddFile from "./components/File/Addfiles";
import FileList from "./components/File/FileList";
import FileInput from "./components/File/FileInput";

export default function App() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [subfolderName , setsubfolderName] = useState("")
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showFileInput , setShowFileInput] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedSubFolderId, setSelectedSubFolderId] = useState(null)
  


  const onToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleFolderCollapse = (folderId) => {
    const updateFolders = (folders) =>
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, collapsed: !folder.collapsed }
          : { ...folder, subfolders: updateFolders(folder.subfolders) }
      );
  
    setFolders((prevFolders) => updateFolders(prevFolders));
  };
  

  const handleFolderAdd = () => {
    setShowFolderInput(true);
    setShowFileInput(false);
  };

  const handleFileAdd = ()=>{
    setShowFileInput(true);
    setShowFolderInput(false)
  }

  const handleFileCreate = () => {
    if (fileName.trim() !== "") {
      setFiles((prevFiles) => [...prevFiles, 
        { id: Date.now(), name: fileName.trim() }]);
      setFileName("");
      setShowFileInput(false);
    }
  };

  const handleFolderCreate = () => {
    if (folderName.trim() === "") return;

    const newFolder = {
      id: Date.now(),
      name: folderName.trim(),
      collapsed: false,
      subfolders: [], // This folder can have subfolders now
      files: [],
    };

    if (selectedFolderId) {
      
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, subfolders: [...folder.subfolders, newFolder] }
            : folder
        )
      );
    } else {
      // Add to the root folder
      setFolders((prevFolders) => [...prevFolders, newFolder]);
    }

    setFolderName("");
    setShowFolderInput(false);
    setSelectedFolderId(null);
    setSelectedSubFolderId(null); // Reset the selected folder
  };

  const handleFolderSelect = (folderId) => {
    console.log("selected folder", folderId);
    setSelectedFolderId(folderId);
  };

  const addFileToFolder = (folderId, fileName)=>{
    const addFile = (folders)=>
      folders.map((folder)=>
      folder.id === folderId
     ? {...folder , files: [...folder.files, fileName]}
     : {...folder, subfolders: addFile(folder.subfolders)}
      );

      setFolders((prev)=> addFile(prev));
  }


  const handleEdit = (id, newName) => {
    setFolders((prev) =>
      prev.map((folder) => {
        if (folder.id === id) {
          return { ...folder, name: newName };
        }
        if (folder.subfolders.length > 0) {
          return {
            ...folder,
            subfolders: folder.subfolders.map((subfolder) =>
              subfolder.id === id
                ? { ...subfolder, name: newName }
                : subfolder
            ),
          };
        }
        const updatedFiles = folder.files.map((file, index) =>
          `${folder.id}-file-${index}` === id ? newName : file
        );
        return { ...folder, files: updatedFiles };
      })
    );
  };

  const handleDelete = (id) => {
    const deleteFolderOrFile = (folders)=>
      folders.filter((folder)=> {
        if(folder.id === id){
          return false;
        }
        if(folder.subfolders.length > 0){
          folder.subfolders = deleteFolderOrFile(folder.subfolders);
        }
        folder.files = folder.files.filter(
          (_, index) => `${folder.id}-file-${index}` !== id
        )
        return true;
      })

      setFolders((prev)=> deleteFolderOrFile(prev));
  }
  

    const handleFileEdit = (id, newName) => {
      setFiles((prev) =>
        prev.map((file) => (file.id === id ? { ...file, name: newName } : file))
      );
    };
    

  const handleFileDelete = (id) =>{
    setFiles((prev)=>prev.filter((file)=> file.id!== id));
  }


  const handleAddSubfolder = (parentFolderId) => {
    //if(!folderName.trim()) return ;
    const createSubfolder = (folders) =>
      folders.map((folder) =>
        folder.id === parentFolderId
          ? {
              ...folder,
              subfolders: [
                ...folder.subfolders,
                {
                  id: Date.now(),
                  name: subfolderName,
                  collapsed: false,
                  subfolders: [],
                  files: [],
                },
              ],
            }
          : {
              ...folder,
              subfolders: createSubfolder(folder.subfolders),
            }
      );
    setFolders((prev) => createSubfolder(prev));
    setsubfolderName("");
    setShowFolderInput(false);
    setSelectedSubFolderId(null)
  
  };
  


//  const handleAddSubfolder = (parentFolderId) => {
//    if(!folderName.trim()) return ;

//    setFolders((prev)=> 
//     addSubfolder(prev, parentFolderId,  folderName.trim()));
   
//    setFolderName("");
//   }
  return (
    <section className="p-4">
      <div className="border rounded shadow-md p-4 w-1/2 mx-auto bg-white">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={onToggle}
          >
            {isCollapsed ? (
              <RxCaretRight size={22} className="text-gray-600" />
            ) : (
              <RxCaretDown size={22} className="text-gray-600" />
            )}
            <p className="ml-2 font-semibold text-gray-700">Javascript</p>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={handleFileAdd}>
            <AddFile files={files} setFiles={setFiles} />
            </button>
           
            <button onClick={handleFolderAdd}>
              <AddFolder />
            </button>
          </div>
        </div>

       
        {/* Show Folder Input */}
        {showFolderInput && (
         
            <FolderInput
              folderName={folderName}
              onChange={setFolderName}
              onCreate={handleFolderCreate}
              />
         
        )}

        {selectedSubFolderId && (
          <FolderInput 
          folderName={folderName}
          onChange={setFolderName}
          onCreate={()=> handleAddSubfolder(selectedSubFolderId)}
          />
        )}

        {showFileInput && (
          <div className="flex w-full">
            <FileInput 
            fileName={fileName}
            onChange={setFileName}
            onCreate={handleFileCreate} />
          </div>
        )}

        {/* File List */}
        {!isCollapsed && files.length > 0 && (
          <FileList 
          files={files} 
          setFiles={setFiles}
          onEdit={handleFileEdit}
          onDelete={handleFileDelete} />
        )}

        {/* Folder List */}
        {!isCollapsed && (
          <>
            {folders.length > 0 ? (
              <FolderList
                folders={folders}
                setFolders={setFolders}
                onToggle={toggleFolderCollapse}
               // onSelect={handleFolderSelect}
                //selectedFolderId={selectedFolderId}
                //onAddSubfolder={handleFolderAdd} // Pass the function to add subfolders
                onAddFile={addFileToFolder}
                onEdit={handleEdit}
                onDelete = {handleDelete}
                onAddSubFolder={handleAddSubfolder}
              />
            ) : (
              <p className="text-gray-500 text-sm mt-2">
                No folders added yet. Use the "+" button to add a folder.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
