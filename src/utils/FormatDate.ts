export class FormatDate {
  static from(str: string): Date {
    const array = str.split(".");
    return new Date(`${array[2]}.${array[1]}.${array[0]}`);
  }

  static to(date: Date) {
    try {
      const array = date.toISOString().split("T")[0].split("-");
      return `${array[2]}.${array[1]}.${array[0]}`;
    } catch {
      return "";
    }
  }
}
