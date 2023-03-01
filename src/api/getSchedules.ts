import { parse } from "node-html-parser";
import { IGetScheduleDto } from "../dto/getScheduleDto";
import { FormatDate } from "../utils/FormatDate";
import { ConvertWin1254 } from "../utils/ConvertWin1254";
import { BASE_API_URL } from "./baseUrl";

export async function getSchedules(param: IGetScheduleDto) {
  let body = `faculty=0&teacher=${param.teacher}&course=0&group=${param.group}&sdate=${param.startAt}&edate=${param.endAt}&n=700`;

  const request = await fetch(BASE_API_URL + "?n=700", {
    method: "POST",
    body,
  });

  const text = ConvertWin1254.from(Buffer.from(await request.arrayBuffer()));
  return parseSchedule(text);
}

function parseSchedule(payload: string) {
  const html = parse(payload);
  const result: ISchedule[] = [];
  let indexCount = -1;

  for (let element of html.querySelectorAll("h4").slice(4)) {
    result.push({
      date: FormatDate.from(element.childNodes[0].innerText),
      weekName: element.childNodes[1].innerText,
      lessons: [],
    });
  }

  for (let element of html.querySelectorAll("tr")) {
    const index = +element.childNodes[0].innerText;
    const date = element.childNodes[1].innerText;
    const title = element.childNodes[2].innerText;

    if (index === 1) indexCount++;
    if (title === " ") continue;

    result[indexCount].lessons.push({
      index,
      date: `${date.slice(0, 5)}-${date.slice(5)}`,
      title,
    });
  }

  return result;
}

interface ILesson {
  index: number;
  date: string;
  title: string;
}

interface ISchedule {
  date: Date;
  weekName: string;
  lessons: ILesson[];
}
