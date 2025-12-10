import { useState } from 'react';
import { GripVertical, Trash2, BookOpen, Calendar, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const EditPlanPage = () => {

  const [commentSent, setCommentSent] = useState(false);
  const [comment, setComment] = useState("")
  const [availableCourses] = useState([
    { id: 'cs101', code: 'CS 101', name: 'Intro to Computer Science', credits: 3, color: 'bg-blue-50' },
    { id: 'math201', code: 'MATH 201', name: 'Calculus I', credits: 4, color: 'bg-green-50' },
    { id: 'eng102', code: 'ENG 102', name: 'English Composition', credits: 3, color: 'bg-yellow-50' },
    { id: 'phys101', code: 'PHYS 101', name: 'Physics I', credits: 4, color: 'bg-purple-50' },
    { id: 'cs201', code: 'CS 201', name: 'Data Structures', credits: 3, color: 'bg-blue-50' },
    { id: 'hist101', code: 'HIST 101', name: 'World History', credits: 3, color: 'bg-red-50' },
    { id: 'chem101', code: 'CHEM 101', name: 'General Chemistry', credits: 4, color: 'bg-pink-50' },
    { id: 'bio101', code: 'BIO 101', name: 'Introduction to Biology', credits: 4, color: 'bg-teal-50' },
  ]);

  const [semesterPlan, setSemesterPlan] = useState([
    { id: 'math202', code: 'MATH 202', name: 'Calculus II', credits: 4, color: 'bg-green-50' },
    { id: 'cs250', code: 'CS 250', name: 'Computer Architecture', credits: 3, color: 'bg-blue-50' },
    { id: 'eng201', code: 'ENG 201', name: 'Technical Writing', credits: 3, color: 'bg-yellow-50' },
  ]);

  const [draggedCourse, setDraggedCourse] = useState<any>(null);

  const navigate = useNavigate(); 

  const handleDragStart = (e:any, course:any, source:any) => {
    setDraggedCourse({ course, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToPlan = (e:any) => {
    e.preventDefault();
    if (!draggedCourse) return;

    const { course } = draggedCourse;

    // Add to plan if not already there
    if (!semesterPlan.find(c => c.id === course.id)) {
      setSemesterPlan(prev => [...prev, course]);
    }

    setDraggedCourse(null);
  };

  const removeCourse = (courseId:any) => {
    setSemesterPlan(prev => prev.filter(c => c.id !== courseId));
  };

  const getTotalCredits = () => {
    return semesterPlan.reduce((sum, course) => sum + course.credits, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <button
            onClick={() => navigate("/")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">Spring 2025 Course Planner</h1> */}
          <p className="text-gray-600">Drag courses to edit semester schedule</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Credits</p>
            <p className="text-3xl font-bold text-gray-900">{getTotalCredits()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Courses Enrolled</p>
            <p className="text-3xl font-bold text-blue-600">{semesterPlan.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Available Courses</p>
            <p className="text-3xl font-bold text-green-600">{availableCourses.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-900">Course Catalog</h2>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {availableCourses.map(course => (
                <div
                  key={course.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, course, 'available')}
                  className={`${course.color} p-4 rounded-lg cursor-move hover:shadow-md transition-all border border-gray-200 hover:border-blue-300`}
                >
                  <div className="flex items-start gap-3">
                    <GripVertical className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{course.code}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{course.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{course.credits} credits</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semester Plan */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-900">Planned Courses</h2>
            </div>
            
            <div
              onDragOver={handleDragOver}
              onDrop={handleDropToPlan}
              className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[400px] hover:border-blue-400 transition-colors"
            >
              <div className="space-y-3">
                {semesterPlan.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <Calendar className="mx-auto mb-3 opacity-50" size={48} />
                    <p className="text-base">Drop courses here to build schedule</p>
                  </div>
                ) : (
                  semesterPlan.map(course => (
                    <div
                      key={course.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, course, 'plan')}
                      className={`${course.color} p-4 rounded-lg cursor-move hover:shadow-md transition-all border border-gray-200 group`}
                    >
                      <div className="flex items-start gap-3">
                        <GripVertical className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{course.code}</div>
                          <div className="text-sm text-gray-600 mt-0.5">{course.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{course.credits} credits</div>
                        </div>
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800 p-1"
                          title="Remove course"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800 font-medium mb-1">TOTAL CREDITS</p>
                <p className="text-2xl font-bold text-blue-900">{getTotalCredits()}</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs text-green-800 font-medium mb-1">COURSES</p>
                <p className="text-2xl font-bold text-green-900">{semesterPlan.length}</p>
              </div>
            </div>

            <div className='pt-8'>
                <button 
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                    Recommend Plan
                </button>
            </div>
    
          </div>

        </div>

        <div className='p-8'>
            <textarea
            className="w-full h-40 p-3 border rounded-lg border-gray-300 text-sm resize-y pt-8"
            placeholder="comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
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

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> Drag courses from the catalog to your semester plan. You can reorder courses by dragging them within your plan, or remove them by hovering and clicking the trash icon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPlanPage;