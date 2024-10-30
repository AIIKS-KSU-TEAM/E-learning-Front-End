// src/composables/useCourses.js
import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

export default function useCourses() {
  const courses = ref([]);
  const subjects = ref([]);
  const newCourse = ref({
    subjectId: '',
    title: '',
    description: '',
  });

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('api/courses/');
      courses.value = response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get('api/subjects/');
      subjects.value = response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Create a new course
  const createCourse = async () => {
    try {
      await axiosInstance.post('api/courses/', {
        subject: newCourse.value.subjectId,
        title: newCourse.value.title,
        description: newCourse.value.description,
      });
      clearNewCourse();
      await fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  // Edit an existing course
  const editCourse = async (course) => {
    try {
      await axiosInstance.patch(`api/courses/${course.id}/`, {
        subject: course.subject.id, // Ensure we send the subject ID
        title: course.title,
        description: course.description,
      });
      clearNewCourse();
      await fetchCourses();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    console.log('Deleting course with ID:', id); // Log the ID for debugging
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await axiosInstance.delete(`api/courses/${id}/`);
        await fetchCourses();
      } catch (error) {
        // Log the error response if available for more context
        console.error('Error deleting course:', error.response ? error.response.data : error.message);
      }
    }
  };

  // Clear the new course form
  const clearNewCourse = () => {
    newCourse.value = { subjectId: '', title: '', description: '' };
  };

  // Lifecycle hook to fetch data on mount
  onMounted(() => {
    fetchCourses();
    fetchSubjects();
  });

  return {
    courses,
    subjects,
    newCourse,
    createCourse,
    editCourse,
    deleteCourse,
    clearNewCourse,
  };
}
