import { Router } from "express";
import auth from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";
import { adminGetUsers, adminChageRole, adminDeleteUser } from "../controllers/AdminContorller.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const adminRouter = new Router()

adminRouter.get('/admin/users', auth, authorization.admin, adminGetUsers)

adminRouter.patch('/admin/users/:user_id', auth, authorization.admin, validationMiddleware.adminChageRole, adminChageRole)

adminRouter.delete('/admin/users/:user_id', auth, authorization.admin, validationMiddleware.adminDeleteUser, adminDeleteUser)
export default adminRouter