import { ref, onMounted, onBeforeUnmount } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export default function useModules() {
  const modules = ref([]);

  const fetchModulesByCourse = async (courseId) => {
    try {
      const response = await axiosInstance.get(
        `api/courses/${courseId}/modules/`,
      );
      modules.value = response.data; // Store fetched modules in the ref
    } catch (error) {
      console.error("Failed to fetch modules by course:", error);
      modules.value = []; // Return an empty array if there's an error
    }
  };

  const createModule = async (moduleData, courseId) => {
    try {
      await axiosInstance.post("api/modules/", moduleData);
      await fetchModulesByCourse(courseId); // Fetch modules again after creation to update the list
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const editModule = async (moduleId, moduleData, courseId) => {
    try {
      await axiosInstance.patch(`api/modules/${moduleId}/`, moduleData);
      await fetchModulesByCourse(courseId); // Fetch modules again after editing
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };

  const deleteModule = async (moduleId, courseId) => {
    if (confirm("Are you sure you want to delete this module?")) {
      try {
        await axiosInstance.delete(`api/modules/${moduleId}/`);
        await fetchModulesByCourse(courseId); // Fetch modules again after deletion
      } catch (error) {
        console.error("Error deleting module:", error);
      }
    }
  };

  return {
    modules,
    fetchModulesByCourse,
    createModule,
    editModule,
    deleteModule,
  };
}
