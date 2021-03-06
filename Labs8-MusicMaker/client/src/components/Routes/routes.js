//NONAUTH
export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';

//AUTH
export const DASHBOARD = '/dashboard';
export const CREATE_ASSIGNMENT = '/assignments/createAssignment';
export const ASSIGNMENTS = '/assignments';
export const ASSIGNMENT_STUDENTS = '/assignmentStudents/:assignmentId'; //List of students assigned to an assignment
export const ASSIGNMENT = '/assignments/:id';
export const STUDENTS = '/students';
export const STUDENTSASSIGNMETS = '/studentAssignments/:studentId'; //Lists of a student's (all) assignments
export const BILLING = '/billing';
export const SETTINGS = '/settings';
export const GRADING = '/grading/:studentId/:assignmentId'; //Grade a student's assignment

//URL
export const TEACHER_URL = 'https://musicmaker-4b2e8.firebaseapp.com';

