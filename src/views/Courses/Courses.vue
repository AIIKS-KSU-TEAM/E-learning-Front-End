<template>
    <div class="p-6">
      <h2 class="text-3xl font-bold mb-4">Courses</h2>
      
      <!-- Button to create or edit a course -->
      <button 
        @click="toggleForm" 
        class="mb-4 border border-blue-500 text-blue-500 rounded-md px-4 py-2 transition duration-200 hover:bg-blue-500 hover:text-white"
      >
        {{ showForm ? 'Cancel' : 'Create Course' }}
      </button>
  
      <!-- Form to create/edit a course -->
      <form 
        v-if="showForm" 
        @submit.prevent="submitCourse" 
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h3 class="text-xl font-semibold mb-4">{{ editingCourse ? 'Edit Course' : 'Add Course' }}</h3>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="subject">Subject</label>
          <select 
            v-model="newCourse.subjectId" 
            class="border rounded-md p-2 w-full" 
            required
          >
            <option value="">Select Subject</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Course Title</label>
          <input
            v-model="newCourse.title"
            type="text"
            placeholder="Course Title"
            class="border rounded-md p-2 w-full"
            required
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Course Description</label>
          <textarea
            v-model="newCourse.description"
            placeholder="Course Description"
            class="border rounded-md p-2 w-full"
            required
          ></textarea>
        </div>
  
        <button 
          type="submit" 
          class="bg-blue-500 text-white rounded-md p-2 w-full transition duration-200 hover:bg-blue-600"
        >
          {{ editingCourse ? 'Update Course' : 'Add Course' }}
        </button>
      </form>
  
      <!-- List of courses -->
      <ul>
        <li v-for="course in courses" :key="course.id" class="flex justify-between items-center border-b py-2">
          <span>{{ course.title }} - {{ course.subject.name }}</span>
          <div>
            <button 
              @click="populateCourse(course)" 
              class="border border-blue-500 text-blue-500 rounded-md px-2 py-1 transition duration-200 hover:bg-blue-500 hover:text-white mr-2"
            >
              Edit
            </button>
            <button 
              @click="deleteCourse(course.id)" 
              class="border border-red-500 text-red-500 rounded-md px-2 py-1 transition duration-200 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import useCourses from '@/composables/useCourses';
  
  export default {
    setup() {
      const {
        courses,
        subjects,
        newCourse,
        createCourse,
        editCourse,
        deleteCourse,
        clearNewCourse,
      } = useCourses();
  
      const showForm = ref(false);
      const editingCourse = ref(null);
  
      const toggleForm = () => {
        showForm.value = !showForm.value;
        if (!showForm.value) {
          clearForm();
        }
      };
  
      const clearForm = () => {
        newCourse.value = { subjectId: '', title: '', description: '' };
        editingCourse.value = null;
      };
  
      const populateCourse = (course) => {
        newCourse.value.subjectId = course.subject.id; // Populate subjectId
        newCourse.value.title = course.title; // Populate title
        newCourse.value.description = course.description; // Populate description
        editingCourse.value = course; // Set the course being edited
        showForm.value = true; // Show the form
      };
  
      const submitCourse = async () => {
        try {
          if (editingCourse.value) {
            await editCourse(editingCourse.value); 
          } else {
            await createCourse(); 
          }
          clearForm(); 
        } catch (error) {
          console.error('Error submitting course:', error.response ? error.response.data : error.message);
        }
      };
  
      return {
        courses,
        subjects,
        newCourse,
        createCourse,
        editCourse,
        deleteCourse,
        showForm,
        editingCourse,
        toggleForm,
        populateCourse,
        submitCourse,
      };
    },
  };
  </script>
  