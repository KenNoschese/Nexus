import { currentUser } from "@clerk/nextjs/server";
import { getEnrolledCourses } from "../lib/moodle";

async function courses() {
    const user = await currentUser();
      const metadata = user?.privateMetadata;
    
  const courses = (metadata?.moodleToken && metadata?.moodleUserId) 
    ? await getEnrolledCourses(
        metadata.moodleToken as string, 
        metadata.moodleUserId as number
      )
    : [];
  return (
    <section className="space-y-4">
          <h3 className="text-2xl font-bold">Your Enrolled Courses</h3>
          
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <div 
                  key={course.id} 
                  className="p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800"
                >
                  <h4 className="font-bold text-lg leading-tight">{course.fullname}</h4>
                  <p className="text-sm text-gray-500 mt-2">{course.shortname}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 border-2 border-dashed rounded-xl text-center text-gray-400">
              No courses found. Please link your Daigler25 account.
            </div>
          )}
        </section>
  )
}
export default courses