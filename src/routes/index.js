import express from "express";
import * as indexController from '../controllers/index'

const router = express.Router()

// 首页页面
router
    .get("/", indexController.showIndex);

export default router;