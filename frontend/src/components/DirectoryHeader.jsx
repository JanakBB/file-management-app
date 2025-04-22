import { FaFolderPlus, FaUpload } from "react-icons/fa";

function DirectoryHeader({ directoryName }) {
  return (
    <header className="directory-header">
      <h1>{directoryName}</h1>
      <div className="header-links">
        <button className="icon-button" title="Create Folder">
          <FaFolderPlus />
        </button>
        <button className="icon-button" title="Upload Files">
          <FaUpload />
        </button>
      </div>
    </header>
  );
}

export default DirectoryHeader;
