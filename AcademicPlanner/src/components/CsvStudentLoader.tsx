// import { useEffect, useState } from "react";
// import Papa from "papaparse";


// // Define the Student type 
// export interface Student {
// id: string;
// name: string;
// grade: string;
// registrationDate: string;
// graduationYear: string;
// registrationStatus: string;
// holds: string;
// email: string;
// completedCourses?: any[];
// academicPlan?: any;
// holdDetails?: any;
// }

// export function useStudentsFromCSV() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Papa.parse("/adviseeList.csv", {
//       download: true,
//       header: true,
//       complete: (results: any) => {
//         const formatted: Student[] = results.data.map((row: any, idx: number) => ({
//           id: row.id?.toString() || String(idx + 1),
//           name: row.Name || "",
//           grade: row.Grade || "",
//           registrationDate: row["Registration Date"] || "",
//           graduationYear: row["Graduation Year"]?.toString() || "",
//           registrationStatus: row["Registration Status"] || "",
//           holds: row.Holds || "None",
//           email: row.Email || "",
//           completedCourses: [],
//           academicPlan: {},
//         }));

//         setStudents(formatted);
//         setLoading(false);
//       },
//     });
//   }, []);

//   return students;
// }
