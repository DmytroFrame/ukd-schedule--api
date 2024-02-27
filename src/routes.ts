import { Router } from "express";
import { getScheduleDto } from "./dto/getScheduleDto";
import { getSchedules } from "./api/getSchedules";
import { getGroups } from "./api/getGroups";
import { getTeachers } from "./api/getTeachers";
import { sendErrorResponse } from "./utils/sendErrorResponse";

const router = Router();

router.get("/schedules", async (req, res) => {
  try {
    const param = getScheduleDto(req.query);
    res.json(await getSchedules(param));
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

router.get("/groups", async (_, res) => {
  try {
    res.json(await getGroups());
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

router.get("/teachers", async (_, res) => {
  try {
    res.json(await getTeachers());
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export default router;
