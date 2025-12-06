import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, BookOpen, FileText } from 'lucide-react';
import { useCoursesFromJSON } from '../hooks/useCourseFromJSON';

const CourseDescriptionPage = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const courses = useCoursesFromJSON();
//   const courses = [
//     {
//       code: "CS101",
//       name: "Introduction to Computer Science",
//       description: "Learn the basics of computer science.",
//       required: ["Sofia Jackson", "Lucas Martinez"],
//       planned: ["Lucas Martinez"]
//     },
//     {
//       code: "CS102",
//       name: "Data Structures",
//       description: "Learn about data structures and algorithms.",
//       required: ["Elijah Lee", "Ava Perez", "Sophia Lee"],
//       planned: ["Ava Perez"]
//     },
//     {
//       code: "CS103",
//       name: "Databases",
//       description: "Introduction to database systems.",
//       required: ["Lucas Lee", "Elias Miller", "Noah Robinson"],
//       planned: ["Lucas Lee"]
//     },
//     {
//       code: "CS104",
//       name: "Operating Systems",
//       description: "Learn how operating systems work.",
//       required: ["Ava Perez", "Sophia Lee", "Daniel Harris"],
//       planned: ["Ava Perez"]
//     },
//     {
//       code: "CS105",
//       name: "Computer Networks",
//       description: "Introduction to computer networking.",
//       required: ["Olivia Wright", "Henry Brown", "Elias Williams"],
//       planned: ["Henry Brown"]
//     }
//   ];

  const toggleRow = (index: any) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Demand Analysis</h1>
          <p className="text-gray-600">View course descriptions and student enrollment data</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Courses</p>
            <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students With Requirements</p>
            <p className="text-3xl font-bold text-blue-600">
              {courses.reduce((sum, c) => sum + c.required.length, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Planned</p>
            <p className="text-3xl font-bold text-green-600">
              {courses.reduce((sum, c) => sum + c.planned.length, 0)}
            </p>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}>
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Course Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Course Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Required By</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Planned By</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course, index) => (
                  <React.Fragment key={course.code}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-semibold text-blue-600">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{course.name}</span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.required.length} {course.required.length === 1 ? 'student' : 'students'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {course.planned.length} {course.planned.length === 1 ? 'student' : 'students'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleRow(index)}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          {expandedRow === index ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              View
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr>
                        <td colSpan="5" className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                          <div className="space-y-4">
                            {/* Course Description */}
                            <div className="bg-white rounded-lg shadow p-4">
                              <div className="flex items-start mb-2">
                                <FileText className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Course Description</h3>
                              </div>
                              <p className="text-sm text-gray-700 ml-7">{course.description}</p>
                            </div>

                            {/* Student Lists */}
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Required By */}
                              <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center mb-3">
                                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                    Students with Requirement ({course.required.length})
                                  </h3>
                                </div>
                                <ul className="space-y-2">
                                  {course.required.map((student, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-700 ml-7">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                      {student}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Planned By */}
                              <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center mb-3">
                                  <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                    Students with Course Planned ({course.planned.length})
                                  </h3>
                                </div>
                                <ul className="space-y-2">
                                  {course.planned.map((student, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-700 ml-7">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                      {student}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> Click "View" on any course row to see the course description and lists of students who have it as a requirement or on their planner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptionPage;