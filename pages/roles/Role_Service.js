const Role = require("./Role_Schema");

// Create a new role
exports.createRole = async (roleData) => {
  const { role_name, permission, created_by } = roleData;

  // Check if role already exists
  const existingRole = await Role.findOne({ role_name });
  if (existingRole) {
    throw new Error("Role already exists with this name");
  }

  // Generate roleId
  const lastRole = await Role.findOne().sort({ createdAt: -1 }); 
  let roleId = "ROL-001";

  if (lastRole && lastRole.roleId) {
    const lastNumber = parseInt(lastRole.roleId.split("-")[1], 10);
    roleId = `ROL-${String(lastNumber + 1).padStart(3, "0")}`;
  }

  // Create new role
  const newRole = new Role({
    roleId,
    role_name,
    created_by,          // ✅ FIXED TYPO
    permission: permission || {}, // safe fallback
  });

  return await newRole.save();
};

// Get all roles
exports.getAllRoles = async () => {
  return await Role.find().sort({ createdAt: -1 });
};

// Get role by query (roleId or role_name)
exports.getRoleByQuery = async (query) => {
  const filter = {};
  if (query.roleId) filter.roleId = query.roleId;
  if (query.role_name) filter.role_name = query.role_name;
  return await Role.findOne(filter);
};

// Update role by query
exports.updateRole = async (query, updateBody) => {
  const filter = {};
  if (query.roleId) filter.roleId = query.roleId;
  if (query.role_name) filter.role_name = query.role_name;
  return await Role.findOneAndUpdate(filter, updateBody, { new: true });
};

// Delete role by query
exports.deleteRole = async (query) => {
  const filter = {};
  if (query.roleId) filter.roleId = query.roleId;
  if (query.role_name) filter.role_name = query.role_name;
  return await Role.findOneAndDelete(filter);
};
