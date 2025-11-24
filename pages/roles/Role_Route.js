const express = require("express");
const router = express.Router();

const RoleController = require("./Role_Controller");

// Create a new role
router.post("/createrole", RoleController.createRole);

// Get all roles
router.get("/getallroles", RoleController.getAllRoles);

// Get role by query (roleId or role_name)
router.get("/getrolebyid", RoleController.getRoleByQuery);

// Update role by query
router.put("/updaterolebyid", RoleController.updateRole);

// Delete role by query
router.delete("/deleterolebyid", RoleController.deleteRole);

module.exports = router;
