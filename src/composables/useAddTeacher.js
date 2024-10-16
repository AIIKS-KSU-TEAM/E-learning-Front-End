import { ref } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export const useAddTeacher = () => {
  const newTeacher = ref({
    first_name: "",
    last_name: "",
    subject: "",
  });

  const addTeacher = async () => {
    await axiosInstance.post("api/teachers/", newTeacher.value);
    newTeacher.value = { first_name: "", last_name: "", subject: "" };
    alert("Teacher added successfully!");
    window.location.href = "/";
  };

  return {
    newTeacher,
    addTeacher,
  };
};
