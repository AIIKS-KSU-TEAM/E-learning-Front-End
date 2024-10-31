// src/composables/useModuleContents.js

import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

export default function useModuleContents(moduleId) {
  const contents = ref([]);
  const newContent = ref({ moduleId, content: '' });
  const modules = ref([]); // You can fetch modules if needed

  const fetchContents = async () => {
    const response = await axiosInstance.get(`api/contents/?moduleId=${moduleId}`);
    contents.value = response.data;
  };

  const createContent = async () => {
    await axiosInstance.post('api/contents/', newContent.value);
    newContent.value.content = ''; 
    await fetchContents();
  };

  const editContent = async (content) => {
    const newContentValue = prompt("Edit Content", content.content);
    if (newContentValue) {
      await axiosInstance.patch(`api/contents/${content.id}/`, { content: newContentValue });
      await fetchContents();
    }
  };

  const deleteContent = async (id) => {
    if (confirm("Are you sure you want to delete this content?")) {
      await axiosInstance.delete(`api/contents/${id}/`);
      await fetchContents();
    }
  };

  onMounted(fetchContents);

  return {
    contents,
    newContent,
    modules,
    fetchContents,
    createContent,
    editContent,
    deleteContent,
  };
}
