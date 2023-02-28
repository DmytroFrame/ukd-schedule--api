import { convertFromWin1254 } from "utils/convertFromWin1254";



export async function getSchedule() {
  let body =
    "faculty=0&teacher=&course=0&group=%B2%CF%C7%F1-19&sdate=01.01.2022&edate=01.01.2023&n=700";

  const request = await fetch(
    "http://195.162.83.28/cgi-bin/timetable.cgi?n=700",
    {
      method: "POST",
      body,
    }
  );


  const text = convertFromWin1254(Buffer.from(await request.arrayBuffer()));
//   console.log(text);
}
getSchedule();
