import { ref } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

export default function useCourses() {
  const courses = ref([]);
  const newCourse = ref({ title: '', description: '' });
  const loading = ref(false);
  const error = ref(null);

  const fetchCoursesBySubject = async (subjectId) => {
    loading.value = true;
    try {
      const response = await axiosInstance.get(`api/subjects/${subjectId}/courses/`);
      courses.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch courses.';
    } finally {
      loading.value = false;
    }
  };

  const createCourse = async (subjectId) => {
    loading.value = true;
    try {
      const response = await axiosInstance.post(`api/subjects/${subjectId}/courses/`, newCourse.value);
      courses.value.push(response.data);
      clearNewCourse();
    } catch (err) {
      error.value = 'Failed to create course.';
    } finally {
      loading.value = false;
    }
  };

  const editCourse = async (courseId) => {
    loading.value = true;
    try {
      const response = await axiosInstance.put(`api/courses/${courseId}/`, newCourse.value);
      const index = courses.value.findIndex((course) => course.id === courseId);
      if (index !== -1) courses.value[index] = response.data;
      clearNewCourse();
    } catch (err) {
      error.value = 'Failed to update course.';
    } finally {
      loading.value = false;
    }
  };

  const deleteCourse = async (courseId) => {
    loading.value = true;
    try {
      await axiosInstance.delete(`api/courses/${courseId}/`);
      courses.value = courses.value.filter((course) => course.id !== courseId);
    } catch (err) {
      error.value = 'Failed to delete course.';
    } finally {
      loading.value = false;
    }
  };

  const clearNewCourse = () => {
    newCourse.value = { title: '', description: '' };
  };

  return {
    courses,
    newCourse,
    loading,
    error,
    fetchCoursesBySubject,
    createCourse,
    editCourse,
    deleteCourse,
    clearNewCourse,
  };
}
