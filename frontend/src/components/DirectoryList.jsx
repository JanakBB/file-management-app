import DirectoryItem from "./DirectoryItem";

function DirectoryList({ items, handleRowClick }) {
  return (
    <div className="directory-list">
      {items.map((item) => (
        <DirectoryItem
          key={item.id}
          item={item}
          handleRowClick={handleRowClick}
        />
      ))}
    </div>
  );
}

export default DirectoryList;
