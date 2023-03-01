import { Router } from "express";
import { getScheduleDto } from "./dto/getScheduleDto";
import { getSchedules } from "./api/getSchedules";
import { getGroups } from "./api/getGroups";
import { getTeachers } from "./api/getTeachers";

const router = Router();

router.get("/schedules", async (req, res) => {
  try {
    const param = getScheduleDto(req.query);
    res.json(await getSchedules(param));
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.get("/groups", async (_, res) => {
  try {
    res.json(await getGroups());
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.get("/teachers", async (_, res) => {
  try {
    res.json(await getTeachers());
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

export default router;
