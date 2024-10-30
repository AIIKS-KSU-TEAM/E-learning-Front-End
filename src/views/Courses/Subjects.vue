<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Subjects</h2>
  
      <!-- Button to toggle the form for creating a new subject -->
      <button @click="toggleForm" class="bg-blue-500 text-white rounded p-2 mb-4">
        {{ isEditing ? 'Cancel Edit' : 'Create New Subject' }}
      </button>
  
      <!-- Form to create/edit a subject -->
      <form v-if="isFormVisible" @submit.prevent="isEditing ? updateSubject() : createSubject()" class="mb-4">
        <div class="mb-2">
          <label for="name" class="block text-sm font-medium text-gray-700">Subject Name</label>
          <input
            v-model="newSubject.name"
            type="text"
            id="name"
            placeholder="Enter Subject Name"
            class="border rounded p-2 w-full"
            required
          />
        </div>
        <div class="mb-2">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="newSubject.description"
            id="description"
            placeholder="Enter Subject Description"
            class="border rounded p-2 w-full"
            required
          ></textarea>
        </div>
        <button type="submit" class="bg-green-500 text-white rounded p-2">
          {{ isEditing ? 'Update Subject' : 'Add Subject' }}
        </button>
      </form>
  
      <!-- List of subjects -->
      <ul>
        <li
          v-for="subject in subjects"
          :key="subject.id"
          class="flex justify-between items-center border-b py-2"
        >
          <div>
            <h3 class="font-semibold">{{ subject.name }}</h3>
            <p class="text-gray-600">{{ subject.description }}</p>
          </div>
          <div>
            <button @click="editSubject(subject)" class="text-blue-500 outline outline-blue-500 rounded px-2 py-1">
              Edit
            </button>
            <button @click="deleteSubject(subject.id)" class="text-red-500 outline outline-red-500 rounded px-2 py-1 ml-2">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import useSubjects from '@/composables/useSubjects';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const {
        subjects,
        newSubject,
        isEditing,
        fetchSubjects,
        createSubject,
        updateSubject,
        editSubject,
        deleteSubject,
        clearForm,
      } = useSubjects();
  
      // Reactive variable to control the form visibility
      const isFormVisible = ref(false);
  
      // Function to toggle the form visibility
      const toggleForm = () => {
        isFormVisible.value = !isFormVisible.value;
        if (!isFormVisible.value) {
          clearForm(); // Clear the form when hiding
        }
      };
  
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
        isFormVisible,
        toggleForm,
      };
    },
  };
  </script>
  
  