import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

export default function useSubjects() {
  const subjects = ref([]);
  const newSubject = ref({ name: '', description: '' }); // Updated to include description
  const isEditing = ref(false); // State to determine if we are editing

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get('api/subjects/');
      subjects.value = response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const createSubject = async () => {
    try {
      await axiosInstance.post('api/subjects/', newSubject.value);
      clearForm(); // Clear form after creation
      await fetchSubjects();
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  const updateSubject = async () => {
    if (!newSubject.value.id) return; // No ID means nothing to update
    try {
      await axiosInstance.patch(`api/subjects/${newSubject.value.id}/`, newSubject.value);
      clearForm(); // Clear form after update
      await fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const editSubject = (subject) => {
    newSubject.value = { ...subject }; // Populate the form with the subject details
    isEditing.value = true; // Set editing mode
  };

  const deleteSubject = async (id) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      try {
        await axiosInstance.delete(`api/subjects/${id}/`);
        await fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  const clearForm = () => {
    newSubject.value = { name: '', description: '' }; // Reset form fields
    isEditing.value = false; // Reset editing mode
  };

  onMounted(fetchSubjects);

  return {
    subjects,
    newSubject,
    isEditing,
    fetchSubjects,
    createSubject,
    updateSubject,
    editSubject,
    deleteSubject,
    clearForm,
  };
}
