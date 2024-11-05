import { ref, watch } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export default function useModuleContents(moduleId) {
  const contents = ref([]);
  const modules = ref([]);
  const newContent = ref({
    moduleId: moduleId.value, // Initialize with the value
    content: "",
    contentType: "", // Added contentType to track user selection
  });

  // Fetch modules and contents
  const fetchModules = async () => {
    try {
      const response = await axiosInstance.get("/api/modules/");
      modules.value = response.data;
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const fetchContents = async () => {
    try {
      console.log("Fetching contents for moduleId:", moduleId.value);
      const response = await axiosInstance.get(
        `/api/modules/${moduleId.value}/contents/`,
      );
      contents.value = response.data;
    } catch (error) {
      console.error("Failed to fetch contents:", error);
    }
  };

  const createContent = async (contentType, content) => {
    try {
      const response = await axiosInstance.post(
        `/api/modules/${newContent.value.moduleId}/contents/`,
        {
          content_type: contentType, // Use the dynamic contentType from form
          content: content, // Use the dynamic content from form
        },
      );
      contents.value.push(response.data);
      resetNewContent(); // Reset fields after submission
    } catch (error) {
      console.error("Failed to create content:", error);
    }
  };

  const resetNewContent = () => {
    newContent.value = {
      moduleId: moduleId.value,
      content: "",
      contentType: "",
    };
  };

  const editContent = async (content) => {
    // Implement edit logic here
    console.log("Edit content:", content);
  };

  const deleteContent = async (contentId) => {
    try {
      await axiosInstance.delete(`/api/contents/${contentId}/`);
      contents.value = contents.value.filter((c) => c.id !== contentId);
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  const viewContent = (content) => {
    console.log("View content:", content);
  };

  // Fetch modules initially
  fetchModules();

  // Watch for changes in moduleId
  watch(moduleId, fetchContents);

  return {
    contents,
    modules,
    newContent,
    createContent,
    editContent,
    deleteContent,
    viewContent,
    fetchContents,
  };
}
