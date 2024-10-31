<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Subjects</h2>

        <button
          @click="toggleForm"
          class="bg-blue-500 text-white rounded-lg p-3 mb-4 hover:bg-blue-600 transition duration-200"
        >
          {{ isEditing ? 'Cancel Edit' : 'Create New Subject' }}
        </button>

        <form
          v-if="isFormVisible"
          @submit.prevent="isEditing ? updateSubject(selectedSubjectId) : createSubject()"
          class="mb-6 space-y-4"
        >
          <input
            type="text"
            v-model="newSubject.name"
            placeholder="Subject Name"
            class="border p-2 rounded w-full"
            required
          />
          <textarea
            v-model="newSubject.description"
            placeholder="Subject Description"
            class="border p-2 rounded w-full"
            required
          ></textarea>
          <button
            type="submit"
            class="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition duration-200"
          >
            {{ isEditing ? 'Update Subject' : 'Create Subject' }}
          </button>
        </form>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="subject in subjects"
            :key="subject.id"
            class="flex flex-col p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div>
              <h3 class="font-semibold text-gray-800">{{ subject.name }}</h3>
              <p class="text-gray-600">{{ subject.description }}</p>
            </div>
            <div class="mt-auto">
              <button @click="handleEditSubject(subject)" class="text-blue-500 border rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white">
                Edit
              </button>
              <button @click="deleteSubject(subject.id)" class="text-red-500 border rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white ml-2">
                Delete
              </button>
              <button @click="viewCourses(subject.id, subject.name)" class="text-green-500 border rounded-lg px-4 py-2 hover:bg-green-500 hover:text-white ml-2">
                View 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import useSubjects from '@/composables/useSubjects';

const router = useRouter();
const { subjects, newSubject, isEditing, fetchSubjects, createSubject, updateSubject, deleteSubject, clearForm } = useSubjects();
const isFormVisible = ref(false);
const selectedSubjectId = ref(null);

const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
  if (!isFormVisible.value) {
    clearForm();
    selectedSubjectId.value = null; // Reset selected subject ID
    isEditing.value = false; // Reset editing state
  }
};

const handleEditSubject = (subject) => {
  newSubject.value = { ...subject }; // Populate form with subject details
  selectedSubjectId.value = subject.id; // Store the selected subject ID
  isEditing.value = true; // Set editing mode
  isFormVisible.value = true; // Show the form
};

const viewCourses = (subjectId, subjectName) => {
  router.push({ name: 'Courses', query: { subjectId, subjectName } });
};
</script>
