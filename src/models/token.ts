import { DataTypes } from "sequelize";
import { User } from "./user";
import { client } from "../db";

export const Token = client.define('pg_cl_token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Token.belongsTo(User);
User.hasOne(Token);