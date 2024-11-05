import { ref, onMounted } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";

export default function useSubjects() {
  const subjects = ref([]);
  const newSubject = ref({ name: "", description: "" });
  const isEditing = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const editingSubjectId = ref(null); // To hold the ID of the subject being edited

  // Fetch all subjects
  const fetchSubjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axiosInstance.get("api/subjects/");
      subjects.value = response.data;
    } catch (err) {
      console.error("Error fetching subjects:", err);
      error.value = "Failed to fetch subjects.";
    } finally {
      loading.value = false;
    }
  };

  // Create a new subject
  const createSubject = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axiosInstance.post(
        "api/subjects/",
        newSubject.value,
      );
      subjects.value.push(response.data); // Add new subject to subjects list
      clearForm(); // Reset form
    } catch (err) {
      console.error("Error creating subject:", err);
      error.value = "Failed to create a new subject.";
    } finally {
      loading.value = false;
    }
  };

  // Update an existing subject
  const updateSubject = async (subjectId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axiosInstance.put(
        `api/subjects/${subjectId}/`,
        newSubject.value,
      );
      const index = subjects.value.findIndex(
        (subject) => subject.id === subjectId,
      );
      if (index !== -1) {
        subjects.value[index] = response.data; // Update the subject in the list
      }
      clearForm(); // Reset form
      isEditing.value = false;
    } catch (err) {
      console.error("Error updating subject:", err);
      error.value = "Failed to update the subject.";
    } finally {
      loading.value = false;
    }
  };

  // Delete a subject
  const deleteSubject = async (subjectId) => {
    loading.value = true;
    error.value = null;
    try {
      await axiosInstance.delete(`api/subjects/${subjectId}/`);
      subjects.value = subjects.value.filter(
        (subject) => subject.id !== subjectId,
      ); // Remove deleted subject from list
    } catch (err) {
      console.error("Error deleting subject:", err);
      error.value = "Failed to delete the subject.";
    } finally {
      loading.value = false;
    }
  };

  // Clear form
  const clearForm = () => {
    newSubject.value = { name: "", description: "" };
    editingSubjectId.value = null; // Reset the editing subject ID
    isEditing.value = false; // Reset editing state
  };

  // Set the subject being edited
  const setEditSubject = (subjectId) => {
    editingSubjectId.value = subjectId;
    isEditing.value = true; // Set editing state
  };

  onMounted(fetchSubjects);

  return {
    subjects,
    newSubject,
    isEditing,
    loading,
    error,
    fetchSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    clearForm,
    setEditSubject,
  };
}
