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

  for (let element of html.querySelectorAll("h4").slice(4)) {
    result.push({
      date: FormatDate.from(element.childNodes[0].innerText),
      weekName: element.childNodes[1].innerText,
      lessons: [],
    });
  }

  let indexCount = -1;
  const table = html.querySelectorAll(".col-md-6 > table");

  for (const tbody of table) {
    for (const tr of tbody.childNodes) {
      const index = Number(tr.childNodes[0].innerText);
      const date = tr.childNodes[1].innerText;
      const title = tr.childNodes[2].innerText;
      const rawTitle = tr.childNodes[2].toString();

      if (index === 1) indexCount++;
      if (title === " ") continue;

      result[indexCount].lessons.push({
        index,
        date: `${date.slice(0, 5)}-${date.slice(5)}`,
        title,
        rawTitle,
      });
    }
  }

  return result;
}

interface ILesson {
  index: number;
  date: string;
  title: string;
  rawTitle: string;
}

interface ISchedule {
  date: Date;
  weekName: string;
  lessons: ILesson[];
}
