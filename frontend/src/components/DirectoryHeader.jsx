import { FaFolderPlus, FaUpload } from "react-icons/fa";

function DirectoryHeader({
  directoryName,
  onCreateFolderClick,
  onUploadFilesClick,
  fileInputRef,
  handleFilesSelect,
}) {
  return (
    <header className="directory-header">
      <h1>{directoryName}</h1>
      <div className="header-links">
        <button className="icon-button" title="Create Folder" onClick={onCreateFolderClick}>
          <FaFolderPlus />
        </button>
        <button className="icon-button" title="Upload Files" onClick={onUploadFilesClick}>
          <FaUpload />
        </button>
        <input type="file" ref={fileInputRef} id="file-upload" style={{display: "none"}} multiple onChange={handleFilesSelect} />
      </div>
    </header>
  );
}

export default DirectoryHeader;
