import { MoodleSiteInfo } from "../types/moodle";

const MOODLE_URL = "https://daigler25.addu.edu.ph/webservice/rest/server.php";
export async function getEnrolledCourses(token: string, userId: number) {
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

export async function logEnrolledCourses(token: string, userId: number): Promise<void> {
  const params = new URLSearchParams({
    wstoken: token,
    wsfunction: "core_enrol_get_users_courses",
    moodlewsrestformat: "json",
    userid: userId.toString(),
  });

  try {
    const response = await fetch(`${MOODLE_URL}?${params.toString()}`);
    
    // Check if the network request actually worked
    if (!response.ok) {
      console.error("HTTP Error:", response.status);
      return;
    }

    const courses = await response.json();

    console.log("--- Nexus Academic Data: Courses Found ---");
    console.dir(courses, { depth: null }); // depth: null ensures you see all nested objects
    console.log("-------------------------------------------");
    
  } catch (error) {
    console.error("Failed to pull courses from Daigler25:", error);
  }
}

export async function getCourseAssignments(token: string, courseIds: number[]) {
  const params = new URLSearchParams({
    wstoken: token,
    wsfunction: "mod_assign_get_assignments",
    moodlewsrestformat: "json",
  });

  courseIds.forEach((id, index) => {
    params.append(`courseids[${index}]`, id.toString());
  });

  const response = await fetch(`${MOODLE_URL}?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch assignments");
  
  return await response.json();
}