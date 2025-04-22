import { FaFolder } from "react-icons/fa";

function DirectoryItem({ item, handleRowClick }) {
  return (
    <div
      className="list-item hoverable-row"
      onClick={() =>
        handleRowClick(item.isDirectory ? "directory" : "file", item.id)
      }
    >
      <div className="item-left-container">
        <div className="item-left">
          {item.isDirectory ? (
            <FaFolder className="folder-icon" />
          ) : (
            <span>File</span>
          )}
          <span>{item.name}</span>
        </div>
      </div>
    </div>
  );
}

export default DirectoryItem;
