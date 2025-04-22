import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DirectoryHeader from "./components/DirectoryHeader";
import DirectoryList from "./components/DirectoryList";
import "./DirectoryView.css";

function DirectoryView() {
  const BASE_URL = "http://localhost:4000";
  const { dirId } = useParams();
  const navigate = useNavigate();
  const [directoryName, setDirectoryName] = useState("My Drive");
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);

  async function getDirectoryItems() {
    const response = await fetch(`${BASE_URL}/directory/${dirId || ""}`);
    const data = await response.json();
    if (data.name) {
      setDirectoryName(dirId ? data.name : "My Drive");
    } else {
      setDirectoryName("My Drive");
    }
    const reversedDirs = [...data.directories].reverse();
    const reversedFiles = [...data.files].reverse();
    setDirectoriesList(reversedDirs);
    setFilesList(reversedFiles);
  }

  useEffect(() => {
    getDirectoryItems();
  }, [dirId]);

  function handleRowClick(type, id) {
    if (type === "directory") {
      navigate(`/directory/${id}`);
    } else {
      window.location.href = `${BASE_URL}/file/${id}`;
    }
  }

  const combinedItems = [
    ...directoriesList.map((d) => ({ ...d, isDirectory: true })),
    ...filesList.map((f) => ({ ...f, isDirectory: false })),
  ];

  return (
    <div className="directory-view">
      <DirectoryHeader directoryName={directoryName} />
      {combinedItems.length === 0 ? (
        <p className="no-data-message">
          This folder is empty. Upload files or create a folder to see some
          data.
        </p>
      ) : (
        <DirectoryList items={combinedItems} handleRowClick={handleRowClick} />
      )}
    </div>
  );
}

export default DirectoryView;
