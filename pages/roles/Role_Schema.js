const mongoose = require("mongoose");

const tabOptionSchema = new mongoose.Schema(
  {
    all: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    view: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    download: { type: Boolean, default: false },
  },
  { _id: false }
);

const permissionSchema = new mongoose.Schema(
  {
    tab_access: { type: Boolean, default: false },
    taboption: { type: tabOptionSchema, default: () => ({}) },
  },
  { _id: false }
);

const RoleSchema = new mongoose.Schema(
  {
    roleId: { type: String, unique: true, required: true },
    role_name: { type: String, unique: true, required: true },
    created_by: { type: String, required: true },
    permission: {
      dashboard: { type: permissionSchema, default: () => ({}) },
      user_management: { type: permissionSchema, default: () => ({}) },
      store_management: { type: permissionSchema, default: () => ({}) },
      menu_management: { type: permissionSchema, default: () => ({}) },
      order_kitchen: { type: permissionSchema, default: () => ({}) },
      wallet_rewards: { type: permissionSchema, default: () => ({}) },
      offer_management: { type: permissionSchema, default: () => ({}) },
      nearby_attractions: { type: permissionSchema, default: () => ({}) },
      reports: { type: permissionSchema, default: () => ({}) },
      settings: { type: permissionSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Role || mongoose.model("Role", RoleSchema);
