const RoleService = require("./Role_Service");

exports.createRole = async (req, res) => {
  try {
    const role = await RoleService.createRole(req.body);
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get role by query (roleId or role_name)
exports.getRoleByQuery = async (req, res) => {
  try {
    const role = await RoleService.getRoleByQuery(req.query);
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update role by query
exports.updateRole = async (req, res) => {
  try {
    const role = await RoleService.updateRole(req.query, req.body);
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete role by query
exports.deleteRole = async (req, res) => {
  try {
    await RoleService.deleteRole(req.query);
    res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
