import FilesUser from "../models/filesuser_model.js";
import Userprofile from "../models/userprofile_model.js";
import Workspace from "../models/workspace_model.js";
export const createFile = async (req, res) => {
  try {
    const {
      id,
      Filename,
      Filelocation,
      Filetype,
      Filesize,
      Ownerid,
      encryptedkey,
      iv,
      authTag,
      checksum,
      version,
      workspaceid
    } = req.body;

    const newFile = await FilesUser.create({
      id,
      Filename,
      Filelocation,
      Filetype,
      Filesize,
      Ownerid,
      encryptedkey,
      iv,
      authTag,
      checksum,
      version: version || 1,
      workspaceid
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      file: newFile
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await FilesUser.findAll({
      include: [
        { model: Userprofile },
        { model: Workspace }
      ]
    });

    return res.status(200).json({ files });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getFileById = async (req, res) => {
  try {
    const file = await FilesUser.findByPk(req.params.id, {
      include: [
        { model: Userprofile },
        { model: Workspace }
      ]
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(200).json({ file });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateFile = async (req, res) => {
  try {
    const file = await FilesUser.findByPk(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await file.update(req.body);

    return res.status(200).json({
      message: "File updated successfully",
      file
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteFile = async (req, res) => {
  try {
    const file = await FilesUser.findByPk(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await file.destroy();

    return res.status(200).json({ message: "File deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getFilesByUser = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const files = await FilesUser.findAll({
      where: { Ownerid: ownerId },
      include: [Userprofile, Workspace]
    });

    return res.status(200).json({ files });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getFilesByWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const files = await FilesUser.findAll({
      where: { workspaceid: workspaceId },
      include: [Userprofile, Workspace]
    });

    return res.status(200).json({ files });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
