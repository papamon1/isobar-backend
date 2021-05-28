const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleName: { type: String, required: true },
  permissions: { type: Array, required: true },
});

module.exports = mongoose.model("Role", roleSchema);
