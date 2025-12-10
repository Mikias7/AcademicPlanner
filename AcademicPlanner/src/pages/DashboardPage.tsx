import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, Mail, GraduationCap, Calendar, User } from 'lucide-react';

import { useStudentsFromJSON } from '../hooks/useStudentsFromJSON';
import { useNavigate } from "react-router-dom";

// Types
interface Student {
  id: string;
  name: string;
  grade: string;
  registrationDate: string;
  graduationYear: string;
  registrationStatus: string;
  holds: string;
  email: string;
  completedCourses: Course[];
  academicPlan: AcademicPlan;
  holdDetails?: HoldDetails;
}

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  semester: string;
}

interface AcademicPlan {
  major: string;
  minor?: string;
  requiredCredits: number;
  completedCredits: number;
  remainingCourses: string[];
}

interface HoldDetails {
  type: string;
  reason: string;
  dateIssued: string;
  resolutionSteps: string[];
}

// // Sample data generator
// const generateSampleData = (): Student[] => {
//   return [
//     {
//       id: '1',
//       name: 'Emma Johnson',
//       grade: 'Junior',
//       registrationDate: '2023-08-25',
//       graduationYear: '2025',
//       registrationStatus: 'Registered',
//       holds: 'None',
//       email: 'emma.johnson@university.edu',
//       completedCourses: [
//         { code: 'CS101', name: 'Intro to Computer Science', credits: 3, grade: 'A', semester: 'Fall 2022' },
//         { code: 'MATH201', name: 'Calculus I', credits: 4, grade: 'B+', semester: 'Fall 2022' },
//         { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A-', semester: 'Spring 2023' },
//         { code: 'CS301', name: 'Algorithms', credits: 3, grade: 'A', semester: 'Fall 2023' },
//       ],
//       academicPlan: {
//         major: 'Computer Science',
//         minor: 'Mathematics',
//         requiredCredits: 120,
//         completedCredits: 78,
//         remainingCourses: ['CS401 - Software Engineering', 'CS420 - Database Systems', 'MATH301 - Linear Algebra']
//       }
//     },
//     {
//       id: '2',
//       name: 'Michael Chen',
//       grade: 'Sophomore',
//       registrationDate: '2024-08-20',
//       graduationYear: '2026',
//       registrationStatus: 'Not Registered',
//       holds: 'Financial Hold',
//       email: 'michael.chen@university.edu',
//       completedCourses: [
//         { code: 'CS101', name: 'Intro to Computer Science', credits: 3, grade: 'B', semester: 'Fall 2023' },
//         { code: 'ENG101', name: 'English Composition', credits: 3, grade: 'A-', semester: 'Fall 2023' },
//         { code: 'CS102', name: 'Programming Fundamentals', credits: 3, grade: 'B+', semester: 'Spring 2024' },
//       ],
//       academicPlan: {
//         major: 'Computer Science',
//         requiredCredits: 120,
//         completedCredits: 45,
//         remainingCourses: ['CS201 - Data Structures', 'MATH201 - Calculus I', 'CS210 - Computer Organization']
//       },
//       holdDetails: {
//         type: 'Financial Hold',
//         reason: 'Outstanding tuition balance of $2,450',
//         dateIssued: '2024-07-15',
//         resolutionSteps: [
//           'Contact the Bursar\'s Office at bursar@university.edu or (555) 123-4567',
//           'Set up a payment plan if unable to pay in full',
//           'Provide proof of financial aid disbursement if applicable'
//         ]
//       }
//     },
//     {
//       id: '3',
//       name: 'Sarah Williams',
//       grade: 'Senior',
//       registrationDate: '2024-08-18',
//       graduationYear: '2025',
//       registrationStatus: 'Registered',
//       holds: 'Academic Advising Hold',
//       email: 'sarah.williams@university.edu',
//       completedCourses: [
//         { code: 'CS101', name: 'Intro to Computer Science', credits: 3, grade: 'A', semester: 'Fall 2021' },
//         { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A', semester: 'Spring 2022' },
//         { code: 'CS301', name: 'Algorithms', credits: 3, grade: 'B+', semester: 'Fall 2022' },
//         { code: 'CS350', name: 'Operating Systems', credits: 3, grade: 'A-', semester: 'Spring 2023' },
//       ],
//       academicPlan: {
//         major: 'Computer Science',
//         minor: 'Business',
//         requiredCredits: 120,
//         completedCredits: 105,
//         remainingCourses: ['CS490 - Senior Capstone', 'CS410 - Machine Learning', 'BUS301 - Entrepreneurship']
//       },
//       holdDetails: {
//         type: 'Academic Advising Hold',
//         reason: 'Required advising appointment for graduation planning',
//         dateIssued: '2024-08-01',
//         resolutionSteps: [
//           'Schedule an appointment with your academic advisor',
//           'Complete the graduation application form',
//           'Review degree audit to ensure all requirements are met'
//         ]
//       }
//     },
//     {
//       id: '4',
//       name: 'James Rodriguez',
//       grade: 'Freshman',
//       registrationDate: '2024-08-22',
//       graduationYear: '2028',
//       registrationStatus: 'Registered',
//       holds: 'None',
//       email: 'james.rodriguez@university.edu',
//       completedCourses: [
//         { code: 'CS100', name: 'Introduction to Programming', credits: 3, grade: 'A', semester: 'Fall 2024' },
//         { code: 'MATH101', name: 'College Algebra', credits: 3, grade: 'B+', semester: 'Fall 2024' },
//       ],
//       academicPlan: {
//         major: 'Computer Science',
//         requiredCredits: 120,
//         completedCredits: 15,
//         remainingCourses: ['CS101 - Intro to CS', 'MATH201 - Calculus I', 'ENG101 - Composition', 'PHYS101 - Physics I']
//       }
//     },
//     {
//       id: '5',
//       name: 'Olivia Taylor',
//       grade: 'Junior',
//       registrationDate: '2024-08-19',
//       graduationYear: '2025',
//       registrationStatus: 'Not Registered',
//       holds: 'Immunization Hold',
//       email: 'olivia.taylor@university.edu',
//       completedCourses: [
//         { code: 'CS101', name: 'Intro to Computer Science', credits: 3, grade: 'B+', semester: 'Fall 2022' },
//         { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A-', semester: 'Spring 2023' },
//         { code: 'CS250', name: 'Computer Architecture', credits: 3, grade: 'B', semester: 'Fall 2023' },
//       ],
//       academicPlan: {
//         major: 'Computer Science',
//         requiredCredits: 120,
//         completedCredits: 72,
//         remainingCourses: ['CS301 - Algorithms', 'CS340 - Networks', 'CS450 - Artificial Intelligence']
//       },
//       holdDetails: {
//         type: 'Immunization Hold',
//         reason: 'Missing required immunization records (MMR, Hepatitis B)',
//         dateIssued: '2024-08-10',
//         resolutionSteps: [
//           'Submit immunization records to Student Health Services',
//           'Visit health.university.edu to upload documents',
//           'Contact Student Health at health@university.edu or (555) 123-4570',
//           'Schedule vaccination appointment if records are unavailable'
//         ]
//       }
//     }
//   ];
// };

const AdvisorDashboard: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
  const students = useStudentsFromJSON()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [commentSent, setCommentSent] = useState(false);
  const [comment, setComment] = useState("")

  const [approvePlan, setApprovePlan] = useState(false);
  // const [approve, setApprove] = useState("")
  
  const navigate = useNavigate();

  // Filter states
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | 'none'>('none');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [graduationYearFilter, setGraduationYearFilter] = useState<string>('all');
  const [holdsFilter, setHoldsFilter] = useState<string>('all');
 
//   useEffect(() => {
//     // In a real app, you would load this from a CSV file
//     setStudents(generateSampleData());
//   }, []);

  // Get unique values for filters
  const grades = ['all', ...Array.from(new Set(students.map(s => s.grade)))];
  const graduationYears = ['all', ...Array.from(new Set(students.map(s => s.graduationYear))).sort()];
  const holds = ['all', 'None', ...Array.from(new Set(students.map(s => s.holds).filter(h => h !== 'None')))];

   const gotToEditPlanPage = () => {
    navigate("/editPlan");
  };

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      if (gradeFilter !== 'all' && student.grade !== gradeFilter) return false;
      if (statusFilter !== 'all' && student.registrationStatus !== statusFilter) return false;
      if (graduationYearFilter !== 'all' && student.graduationYear !== graduationYearFilter) return false;
      if (holdsFilter !== 'all') {
        if (holdsFilter === 'None' && student.holds !== 'None') return false;
        if (holdsFilter === 'Has Holds' && student.holds === 'None') return false;
        if (holdsFilter !== 'None' && holdsFilter !== 'Has Holds' && student.holds !== holdsFilter) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (nameSort === 'asc') return a.name.localeCompare(b.name);
      if (nameSort === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });

  const resetFilters = () => {
    setNameSort('none');
    setGradeFilter('all');
    setStatusFilter('all');
    setGraduationYearFilter('all');
    setHoldsFilter('all');
  };

  const getStatusColor = (status: string) => {
    return status === 'Registered' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50';
  };

  const getHoldColor = (holds: string) => {
    return holds === 'None' ? 'text-gray-600 bg-gray-50' : 'text-red-600 bg-red-50';
  };

  const handleSendEmail = (student: Student) => {
    if (!student.holdDetails) return;

    const subject = `Action Required: ${student.holdDetails.type}`;
    const body = `Dear ${student.name.split(' ')[0]},

This is to inform you that you currently have a ${student.holdDetails.type} on your account.

Reason: ${student.holdDetails.reason}

To resolve this hold, please complete the following steps:

${student.holdDetails.resolutionSteps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

If you have any questions or need assistance, please don't hesitate to reach out.

Best regards,
Your Academic Advisor`;

    // Simulate sending email
    console.log('Sending email to:', student.email);
    console.log('Subject:', subject);
    console.log('Body:', body);
    
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  // const handleSendComment

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedStudent(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </button>

          {/* Student Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedStudent.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {selectedStudent.grade} - {selectedStudent.academicPlan.major}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Graduating {selectedStudent.graduationYear}
                  </span>
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {selectedStudent.email}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.registrationStatus)}`}>
                  {selectedStudent.registrationStatus}
                </span>
                {selectedStudent.holds !== 'None' && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ml-2 ${getHoldColor(selectedStudent.holds)}`}>
                    {selectedStudent.holds}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Student Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Major:</span>
                  <p className="text-gray-900">{selectedStudent.academicPlan.major}</p>
                </div>
                {selectedStudent.academicPlan.minor && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Minor:</span>
                    <p className="text-gray-900">{selectedStudent.academicPlan.minor}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-600">Progress:</span>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(selectedStudent.academicPlan.completedCredits / selectedStudent.academicPlan.requiredCredits) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedStudent.academicPlan.completedCredits}/{selectedStudent.academicPlan.requiredCredits} credits
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Remaining Required Courses:</span>
                  <ul className="mt-2 space-y-1">
                    {selectedStudent.academicPlan.remainingCourses.map((course, idx) => (
                      <li key={idx} className="text-sm text-gray-700 pl-4 border-l-2 border-blue-500">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">Approve</button> */}
              </div>
            </div>

            {/* Completed Courses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Completed Courses</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedStudent.completedCourses.map((course, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{course.code}</p>
                        <p className="text-sm text-gray-600">{course.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{course.semester}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium text-sm">
                          {course.grade}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{course.credits} credits</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Plan */}
            <div className="bg-white rounded-lg shadow-md p-6 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Academic Plan</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedStudent.completedCourses.map((course, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{course.code}</p>
                        <p className="text-sm text-gray-600">{course.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{course.semester}</p>
                      </div>
                      <div className="text-right">
                        {/* <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium text-sm">
                          {course.grade}
                        </span> */}
                        {/* <p className="text-xs text-gray-500 mt-1">{course.credits} credits</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full pt-8">

                <div className="flex gap-3 mt-3 pb-8">
                    <button 
                      onClick={() => {setApprovePlan(!approvePlan)}}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                      Approve
                  </button>


                  <button 
                    onClick={() => gotToEditPlanPage()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                      Edit Plan
                  </button>

                  {approvePlan && (
                    <p className="text-green-700 font-medium mt-3 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Plan Approved
                    </p>)}
                </div>
                

                <textarea
                  className="w-full h-40 p-3 border rounded-lg border-gray-300 text-sm resize-y pt-8"
                  placeholder="comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
              />

                <div className="flex gap-3 mt-3">

                    <button 
                      onClick={() => {setCommentSent(!commentSent), setComment("")}}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                    Comment
                    </button>

                    {commentSent && (
                    <p className="text-green-700 font-medium mt-3 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      comment sent successfully!
                    </p>
                  )}

                </div>
            </div>

              {/* <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">Approve</button> */}
            </div>

          {/* Hold Details */}
          {selectedStudent.holdDetails && (
            <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6 mt-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-red-900 mb-2">{selectedStudent.holdDetails.type}</h2>
                  <p className="text-red-800 mb-3">{selectedStudent.holdDetails.reason}</p>
                  <p className="text-sm text-red-700 mb-3">Hold issued on: {new Date(selectedStudent.holdDetails.dateIssued).toLocaleDateString()}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-red-900 mb-2">Resolution Steps:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {selectedStudent.holdDetails.resolutionSteps.map((step, idx) => (
                        <li key={idx} className="text-sm text-red-800">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <button
                    onClick={() => handleSendEmail(selectedStudent)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Resolution Email to Student
                  </button>

                  {emailSent && (
                    <p className="text-green-700 font-medium mt-3 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Email sent successfully!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advisor Dashboard</h1>
          <p className="text-gray-600">Manage and track your advisees</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{filteredStudents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Registered</p>
            <p className="text-3xl font-bold text-green-600">
              {filteredStudents.filter(s => s.registrationStatus === 'Registered').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Not Registered</p>
            <p className="text-3xl font-bold text-orange-600">
              {filteredStudents.filter(s => s.registrationStatus === 'Not Registered').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Active Holds</p>
            <p className="text-3xl font-bold text-red-600">
              {filteredStudents.filter(s => s.holds !== 'None').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Name Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Name</label>
              <select
                value={nameSort}
                onChange={(e) => setNameSort(e.target.value as 'asc' | 'desc' | 'none')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">No Sort</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>

            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'All Grades' : grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Registration Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Registered">Registered</option>
                <option value="Not Registered">Not Registered</option>
              </select>
            </div>

            {/* Graduation Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
              <select
                value={graduationYearFilter}
                onChange={(e) => setGraduationYearFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {graduationYears.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Holds Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holds</label>
              <select
                value={holdsFilter}
                onChange={(e) => setHoldsFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="None">No Holds</option>
                <option value="Has Holds">Has Holds</option>
                {holds.filter(h => h !== 'all' && h !== 'None').map(hold => (
                  <option key={hold} value={hold}>{hold}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}>
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Graduation Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Registration Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Holds</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => {console.log(student), setSelectedStudent(student)}}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(student.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.graduationYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.registrationStatus)}`}>
                        {student.registrationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getHoldColor(student.holds)}`}>
                        {student.holds}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> Click on any student row to view detailed information, academic plans, and manage holds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;