import Chatmessage from "../models/chatmessage_model.js";
import Userprofile from "../models/userprofile_model.js";
import Workspace from "../models/workspace_model.js";
export const sendMessage = async (req, res) => {
  try {
    const { id, senderid, workspaceid, message } = req.body;


    const sender = await Userprofile.findByPk(senderid);
    if (!sender) return res.status(404).json({ message: "Sender not found" });
    const workspace = await Workspace.findByPk(workspaceid);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const chat = await Chatmessage.create({
      id,
      senderid,
      workspaceid,
      message,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      chat,
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getWorkspaceMessages = async (req, res) => {
  try {
    const { workspaceid } = req.params;

    const messages = await Chatmessage.findAll({
      where: { workspaceid },
      order: [["timestamp", "ASC"]],
      include: [
        { model: Userprofile, attributes: ["id", "name", "email"] },
      ]
    });

    return res.status(200).json({ messages });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getUserMessages = async (req, res) => {
  try {
    const { senderid } = req.params;

    const messages = await Chatmessage.findAll({
      where: { senderid },
      order: [["timestamp", "DESC"]],
      include: [
        { model: Workspace, attributes: ["id", "Name"] }
      ]
    });

    return res.status(200).json({ messages });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getMessageById = async (req, res) => {
  try {
    const message = await Chatmessage.findByPk(req.params.id, {
      include: [
        { model: Userprofile, attributes: ["id", "name"] },
        { model: Workspace, attributes: ["id", "Name"] }
      ]
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({ message });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const editMessage = async (req, res) => {
  try {
    const chat = await Chatmessage.findByPk(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: "Message not found" });
    }

    await chat.update({
      message: req.body.message,
    });

    return res.status(200).json({
      message: "Message updated successfully",
      chat,
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const chat = await Chatmessage.findByPk(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: "Message not found" });
    }

    await chat.destroy();

    return res.status(200).json({ message: "Message deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
