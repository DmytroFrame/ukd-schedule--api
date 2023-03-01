import { ConvertWin1254 } from "../utils/ConvertWin1254";
import { BASE_API_URL } from "./baseUrl";

export async function getTeachers() {
  const request = await fetch(BASE_API_URL + "?n=701&lev=142", {
    method: "GET",
  });

  const text = ConvertWin1254.from(Buffer.from(await request.arrayBuffer()));

  return JSON.parse(text)["suggestions"] as string[];
}
