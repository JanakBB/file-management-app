import express from "express";
import { writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with {type: "json"};
import filesData from "../filesDB.json" with {type: "json"};

const router = express.Router();

// Read directory contents
router.get("/:id?", async (req, res, next) => {
  const id = req.params.id || directoriesData[0].id;
  const directoryData = directoriesData.find(
    (directory) => directory.id === id
  );
  if (!directoryData)
    return res.status(404).json({ message: "Directory not found!" });
  const files = directoryData.files.map((fileId) =>
    filesData.find((file) => file.id === fileId)
  );
  const directories = directoryData.directories
    .map((dirId) => directoriesData.find((dir) => dir.id === dirId))
    .map(({ id, name }) => ({ id, name }));
  return res.status(200).json({ ...directoryData, files, directories });
});

// Create directory
router.post("/:parentDirId?", async (req, res, next) => {
  const parentDirId = req.params.parentDirId || directoriesData[0].id;
  console.log(parentDirId)
  const dirname = req.headers.dirname || "New Folder";
  const id = crypto.randomUUID();
  const parentDir = directoriesData.find((dir) => dir.id === parentDirId);
  if (!parentDir)
    return res
      .status(404)
      .json({ message: "Parent Directory does not exists!" });
  parentDir.directories.push({ id });
  directoriesData.push({
    id,
    name: dirname,
    parentDirId,
    files: [],
    directories: [],
  });
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    return res.status(200).json({ message: "Directory Created!" });
  } catch (err) {
    next(err);
  }
});

export default router;
