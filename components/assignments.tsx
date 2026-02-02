import { currentUser } from "@clerk/nextjs/server";
import { getCourseAssignments, getEnrolledCourses, getAssignmentSubmissions } from "../lib/moodle";
import AssignmentDropdown from "./assignmentDropdown";

export default async function Assignments() {
  const user = await currentUser();
  const metadata = user?.privateMetadata;

  if (!metadata?.moodleToken || !metadata?.moodleUserId) {
    return <div className="text-gray-500">Please link your Moodle account to view assignments.</div>;
  }

  const courses = await getEnrolledCourses(
    metadata.moodleToken as string,
    metadata.moodleUserId as number
  );

  let coursesWithAssignments: any[] = [];
  let submittedAssignmentIds = new Set<number>();

  if (courses.length > 0) {
    try {
      const courseIds = courses.map((c: any) => c.id);
      const data = await getCourseAssignments(metadata.moodleToken as string, courseIds);
      
      // Moodle returns { courses: [ { id, fullname, assignments: [] } ] }
      if (data && data.courses) {
        coursesWithAssignments = data.courses;

        // Collect all assignment IDs to check status
        let allAssignmentIds: number[] = [];
        data.courses.forEach((course: any) => {
          if (course.assignments) {
            course.assignments.forEach((a: any) => allAssignmentIds.push(a.id));
          }
        });

        if (allAssignmentIds.length > 0) {
          const submissionsData = await getAssignmentSubmissions(metadata.moodleToken as string, allAssignmentIds);
          // submissionsData: { assignments: [ { assignmentid, submissions: [ { userid, status } ] } ] }
          
          if (submissionsData && submissionsData.assignments) {
            submissionsData.assignments.forEach((assignment: any) => {
              // Check if the current user has a submission with status 'submitted'
              const userSubmission = assignment.submissions?.find((s: any) => s.userid == metadata.moodleUserId);
              if (userSubmission && userSubmission.status === 'submitted') {
                submittedAssignmentIds.add(assignment.assignmentid);
              }
            });
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch assignments:", e);
      return <div className="text-red-400">Failed to load assignments.</div>;
    }
  }

  // Filter out courses with no pending assignments
  const activeCourses = coursesWithAssignments.map(course => {
    const pendingAssignments = course.assignments?.filter((a: any) => !submittedAssignmentIds.has(a.id)) || [];
    return { ...course, assignments: pendingAssignments };
  }).filter(course => course.assignments.length > 0);

  return (
    <div className="space-y-6 mb-4">
      <h3 className="text-xl font-bold text-gray-200 mt-5">Upcoming Assignments</h3>
      {activeCourses.length > 0 ? (
        <div className="space-y-3">
          {activeCourses.map((course: any) => (
            <AssignmentDropdown key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No active assignments found. Good job!</p>
      )}
      <span className=""></span>
    </div>
  );
}