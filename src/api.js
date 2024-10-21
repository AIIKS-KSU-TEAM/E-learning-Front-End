// src/api.js
import axiosInstance from "@/axiosconfig/axiosInstance";

const API_URL = "course/courses/";

export const getCourses = () => axiosInstance.get(API_URL);
export const getModules = () => axiosInstance.get("course/modules/");
export const createCourse = (courseData) =>
  axiosInstance.post(API_URL, courseData);
export const updateCourse = (id, courseData) =>
  axiosInstance.put(`${API_URL}${id}/`, courseData);
export const deleteCourse = (id) => axiosInstance.delete(`${API_URL}${id}/`);
export const deleteModule = (id) => axiosInstance.delete(`course/modules/${id}/`);
