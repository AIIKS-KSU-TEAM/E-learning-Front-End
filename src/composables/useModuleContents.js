import { ref, watch } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export default function useModuleContents(moduleId) {
  const contents = ref([]);
  const newContent = ref({
    moduleId: moduleId.value,
    content: "",
    contentType: "",
  });
  const newAssignment = ref({
    title: "",
    file: null,
  });

  // Fetch contents and assignments together
  const fetchContents = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/modules/${moduleId.value}/contents/`
      );
      contents.value = response.data;

      await fetchAssignments();
    } catch (error) {
      console.error("Failed to fetch contents:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/modules/${moduleId.value}/assignments/`
      );
      const assignments = response.data.map((assignment) => ({
        ...assignment,
        isAssignment: true,
      }));
      contents.value = [...contents.value, ...assignments];
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  const createContent = async (contentType, content) => {
    try {
      const response = await axiosInstance.post(
        `/api/modules/${newContent.value.moduleId}/contents/`,
        { content_type: contentType, content }
      );
      contents.value.push(response.data);
      resetNewContent();
    } catch (error) {
      console.error("Failed to create content:", error);
    }
  };

  const createAssignment = async () => {
    if (!newAssignment.value.title || !newAssignment.value.file) {
      console.error("Title and file are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newAssignment.value.title);
      formData.append("file", newAssignment.value.file);
      formData.append("module", moduleId.value); // Use the passed moduleId

      const response = await axiosInstance.post(
        `/api/modules/${moduleId.value}/assignments/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      contents.value.push({ ...response.data, isAssignment: true });
      resetNewAssignment();
    } catch (error) {
      console.error("Failed to create assignment:", error);
    }
  };

  const handleFileUpload = (event) => {
    newAssignment.value.file = event.target.files[0];
  };

  const resetNewContent = () => {
    newContent.value = {
      moduleId: moduleId.value,
      content: "",
      contentType: "",
    };
  };

  const resetNewAssignment = () => {
    newAssignment.value = { title: "", file: null };
  };

  const editContent = async (content) => {
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

  watch(moduleId, fetchContents);

  return {
    contents,
    newContent,
    newAssignment,
    createContent,
    createAssignment,
    editContent,
    deleteContent,
    viewContent,
    fetchContents,
    handleFileUpload,
  };
}
