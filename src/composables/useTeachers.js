import { ref } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export const useTeachers = () => {
  const teachers = ref([]);
  const editingTeacher = ref(null);
  const teacherForm = ref({
    first_name: "",
    last_name: "",
    subject: "",
  });

  const fetchTeachers = async () => {
    const response = await axiosInstance.get("api/teachers/");
    teachers.value = response.data;
  };

  const startEditing = (teacher) => {
    editingTeacher.value = teacher.id;
    teacherForm.value = { ...teacher };
  };

  const cancelEditing = () => {
    editingTeacher.value = null;
    teacherForm.value = {
      first_name: "",
      last_name: "",
      subject: "",
    };
  };

  const updateTeacher = async () => {
    const response = await axiosInstance.put(
      `api/teachers/${editingTeacher.value}/`,
      teacherForm.value,
    );
    const index = teachers.value.findIndex(
      (t) => t.id === editingTeacher.value,
    );
    teachers.value[index] = response.data;
    cancelEditing();
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axiosInstance.delete(`api/teachers/${teacherId}/`);
      teachers.value = teachers.value.filter(
        (teacher) => teacher.id !== teacherId,
      );
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return {
    teachers,
    editingTeacher,
    teacherForm,
    fetchTeachers,
    startEditing,
    cancelEditing,
    updateTeacher,
    deleteTeacher,
  };
};
