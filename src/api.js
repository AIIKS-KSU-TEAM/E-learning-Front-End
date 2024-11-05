import axiosInstance from "@/axiosconfig/axiosInstance";

const API_URL = "api/course/courses/";

export const getCourses = () => axiosInstance.get(API_URL);

export const createCourse = (courseData) =>
  axiosInstance.post(API_URL, courseData);

export const updateCourse = (id, courseData) =>
  axiosInstance.put(`${API_URL}${id}/`, courseData);

export const deleteCourse = (id) => axiosInstance.delete(`${API_URL}${id}/`);
