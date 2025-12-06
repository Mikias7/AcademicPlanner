import { useEffect, useState } from "react";

// Define the Course type
export interface Course {
  code: string;
  name: string;
  description: string;
  required: string[];
  planned: string[];
}

// Custom hook to load courses from JSON
export function useCoursesFromJSON() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJSON() {
      try {
        // Adjust the path to your JSON file in public or src folder
        const res = await fetch(`${import.meta.env.BASE_URL}courseList.json`);
        const data = await res.json();

        // Ensure typing and structure
        const formatted: Course[] = data.map((row: any) => ({
          code: row.code,
          name: row.name,
          description: row.description,
          required: row.required,
          planned: row.planned
        }));

        setCourses(formatted);
      } catch (err) {
        console.error("Failed to load courses JSON:", err);
      } finally {
        setLoading(false);
      }
    }

    loadJSON();
  }, []);

  // For debugging: log loading state and courses
  console.log("Loading:", loading);
//   console.log("Courses:", courses);

  return courses;
}
