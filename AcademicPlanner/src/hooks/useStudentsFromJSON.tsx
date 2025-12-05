import { useEffect, useState } from "react";

// Define the Student type 
export interface Student {
  id: string;
  name: string;
  grade: string;
  registrationDate: string;
  graduationYear: string;
  registrationStatus: string;
  holds: string;
  email: string;
  completedCourses?: any[];
  academicPlan?: any;
  holdDetails?: any;
}

export function useStudentsFromJSON() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJSON() {
      try {
        const res = await fetch("/adviseeList.json"); // <-- JSON file path
        const data = await res.json();

        // Data is already structured correctly, but ensure typing:
        const formatted: Student[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          grade: row.grade,
          registrationDate: row.registrationDate,
          graduationYear: row.graduationYear,
          registrationStatus: row.registrationStatus,
          holds: row.holds,
          email: row.email,
          completedCourses: row.completedCourses || [],
          academicPlan: row.academicPlan || {},
          holdDetails: row.holdDetails || null,
        }));

        setStudents(formatted);
      } catch (err) {
        console.error("Failed to load students JSON:", err);
      } finally {
        setLoading(false);
      }
    }

    loadJSON();
  }, []);

  return students;
}
