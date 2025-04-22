import express from "express";
import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import directoriesData from "../directoriesDB.json" with {type: "json"};
import filesData from "../filesDB.json" with {type: "json"};

const router = express.Router();

//Upload file
router.post("/:parentDirId?", (req, res, next) => {
  const parentDirId = req.params.parentDirId || directoriesData[0].id;
  const filename = req.headers.filename || "untitled";
  const id = crypto.randomUUID();
  const extension = path.extname(filename);
  const fullFileName = `${id}${extension}`;
  const writeStream = createWriteStream(`./storage/${fullFileName}`);
  req.pipe(writeStream);
  req.on("end", async () => {
    filesData.push({
      id,
      extension,
      name: filename,
      parentDirId,
    });
    const parentDirData = directoriesData.find(
      (directory) => directory.id === parentDirId
    );
    parentDirData.files.push(id);
    try {
      await writeFile("./filesDB.json", JSON.stringify(filesData));
      await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
      return res.status(201).json({ message: "File Uploaded" });
    } catch (err) {
      next(err);
    }
  });
});

//Download file
router.get("/:id", (req, res, next) => {
    const {id} = req.params
    const fileData = filesData.find((file) => file.id === id)
    if(!fileData){
        return res.status(404).json({message: "File not found!"})
    }
    if(req.query.action === "download"){
        res.set("Content-Disposition", `attachment; filename=${fileData.name}`)
    }
    const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;
    return res.sendFile(filePath, (err) => {
        if(!res.headersSent && err){}
        return res.status(404).json({error: "File not found!"})
    })
})

export default router;