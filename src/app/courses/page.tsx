import Courses from "../../../components/courses";
import Assignments from "../../../components/assignments";

export default function CoursesPage() {
  return (
    <div className="p-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-white">Courses</h1>
      <p className="text-gray-500 mt-4">Manage your academic courses and materials.</p>
      <Assignments />
      <Courses />
      
    </div>
  );
}
