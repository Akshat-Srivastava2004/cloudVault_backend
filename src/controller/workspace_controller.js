import Workspace from "../models/workspace_model.js";
import Workspacemember from "../models/workspacemember_model.js";
import Userprofile from "../models/userprofile_model.js";
export const createWorkspace = async (req, res) => {
  try {
    const { id, Name, leaderId, passKey } = req.body;

    const workspace = await Workspace.create({
      id,
      Name,
      leaderId,
      passKey
    });
    await Workspacemember.create({
      id: Date.now(),
      workspaceId: id,
      userId: leaderId,
      role: "leader"
    });

    return res.status(201).json({
      message: "Workspace created successfully",
      workspace
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findByPk(req.params.id, {
      include: [
        {
          model: Workspacemember,
          include: [Userprofile]
        }
      ]
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({ workspace });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getWorkspaceMembers = async (req, res) => {
  try {
    const members = await Workspacemember.findAll({
      where: { workspaceId: req.params.id },
      include: [Userprofile]
    });

    return res.status(200).json({ members });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const addMember = async (req, res) => {
  try {
    const { workspaceId, userId } = req.body;
    const existing = await Workspacemember.findOne({
      where: { workspaceId, userId }
    });

    if (existing) {
      return res.status(400).json({ message: "User already a member" });
    }

    const member = await Workspacemember.create({
      id: Date.now(),
      workspaceId,
      userId,
      role: "member"
    });

    return res.status(201).json({
      message: "Member added successfully",
      member
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const removeMember = async (req, res) => {
  try {
    const { workspaceId, userId } = req.body;

    const member = await Workspacemember.findOne({
      where: { workspaceId, userId }
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.destroy();

    return res.status(200).json({ message: "Member removed successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const changeRole = async (req, res) => {
  try {
    const { workspaceId, userId, role } = req.body; 

    const member = await Workspacemember.findOne({
      where: { workspaceId, userId }
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.update({ role });

    return res.status(200).json({
      message: "Role updated",
      member
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getUserWorkspaces = async (req, res) => {
  try {
    const { userId } = req.params;

    const workspaces = await Workspacemember.findAll({
      where: { userId },
      include: [Workspace]
    });

    return res.status(200).json({ workspaces });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByPk(req.params.id);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    await workspace.update(req.body);

    return res.status(200).json({
      message: "Workspace updated",
      workspace
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByPk(req.params.id);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    await Workspacemember.destroy({
      where: { workspaceId: req.params.id }
    });
    await workspace.destroy();

    return res.status(200).json({ message: "Workspace deleted" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
