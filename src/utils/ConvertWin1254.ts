import { decode, encode } from "iconv-lite";

export class ConvertWin1254 {
  static from(buffer: Buffer) {
    return decode(buffer, "win1251").toString();
  }

  static to(text: string) {
    return encode(text, "win1251");
  }

  static toURI(text: string) {
    const hex = this.to(text.split("-")[0]).toString("hex").toUpperCase();
    let result = "";

    for (let index = 0; index < hex.length; index++) {
      if (index % 2 === 0) result += `%${hex[index]}${hex[index + 1]}`;
    }

    if (text.split("-")[1]) result += "-" + text.split("-")[1];

    return result;
  }
}
