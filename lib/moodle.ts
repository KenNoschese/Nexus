import { MoodleSiteInfo } from "../types/moodle";

export async function getEnrolledCourses(token: string, userId: number) {
  const MOODLE_URL = "https://daigler25.addu.edu.ph/webservice/rest/server.php";
  
  const params = new URLSearchParams({
    wstoken: token,
    wsfunction: "core_enrol_get_users_courses", // The actual Moodle API name
    moodlewsrestformat: "json",
    userid: userId.toString(),
  });

  const response = await fetch(`${MOODLE_URL}?${params.toString()}`);
  
  if (!response.ok) throw new Error("Failed to fetch courses from Daigler25");

  return await response.json(); 
}