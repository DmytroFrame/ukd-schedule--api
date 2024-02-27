import { IGetScheduleDto } from "../dto/getScheduleDto";
import { FormatDate } from "../utils/FormatDate";
import { ConvertWin1254 } from "../utils/ConvertWin1254";
import { BASE_API_URL } from "./baseUrl";
import * as cheerio from "cheerio";

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

export async function getSchedules(param: IGetScheduleDto) {
  let body = `faculty=0&teacher=${param.teacher}&course=0&group=${param.group}&sdate=${param.startAt}&edate=${param.endAt}&n=700`;

  console.time("#INFO | getSchedule | Time of the schedule request");

  const request = await fetch(BASE_API_URL + "?n=700", {
    method: "POST",
    body,
  });

  const text = ConvertWin1254.from(Buffer.from(await request.arrayBuffer()));

  console.timeEnd("#INFO | getSchedule | Time of the schedule request");

  return parseSchedule(text);
}

function parseSchedule(payload: string) {
  console.time("#INFO | parseSchedule | Time of parsing schedule");

  const $ = cheerio.load(payload);
  const result: ISchedule[] = [];

  for (const day of $("[class*=col-print-6]")) {
    const h4 = $(day).find("h4").text().trim();
    const table = $(day).find("table");

    const resultDay = {
      date: FormatDate.from(h4.split(" ")[0]),
      weekName: h4.split(" ")[1],
      lessons: [],
    };

    for (const tr of $(table).find("tr")) {
      const index = $($(tr).find("td")[0]).text().trim();
      const date = $($(tr).find("td")[1]).text().trim();
      const title = $($(tr).find("td")[2]).text().trim();
      const rawTitle = $($(tr).find("td")[2]).html();

      if (!title) continue;

      resultDay.lessons.push({
        index: +index,
        date: `${date.slice(0, 5)}-${date.slice(5)}`,
        title,
        rawTitle,
      });
    }

    result.push(resultDay);
  }

  console.timeEnd("#INFO | parseSchedule | Time of parsing schedule");
  return result;
}
