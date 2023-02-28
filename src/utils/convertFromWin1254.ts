// import {decode} from 'windows-1251'
import { decode } from "iconv-lite";

export function convertFromWin1254(buffer: Buffer) {
  return decode(buffer, "win1251");
}
