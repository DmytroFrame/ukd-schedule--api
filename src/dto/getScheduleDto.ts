import { ConvertWin1254 } from "../utils/ConvertWin1254";
import { FormatDate } from "../utils/FormatDate";

export interface IGetScheduleDto {
  startAt: string;
  endAt: string;
  teacher: string;
  group: string;
}

export function getScheduleDto(query: Record<string, any>) {
  return {
    startAt: FormatDate.to(new Date(query["startAt"])),
    endAt: FormatDate.to(new Date(query["endAt"])),
    teacher: ConvertWin1254.toURI(query["teacher"] || ""),
    group: ConvertWin1254.toURI(query["group"] || ""),
  } as IGetScheduleDto;
}
