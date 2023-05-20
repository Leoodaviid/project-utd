import api from "./config";
import { UserCreateProps } from "../../models/models";

export const userCreate = (newUser: UserCreateProps) =>
  api.post("/api/register", newUser);
