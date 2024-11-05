<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 p-6">
      <div class="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">{{ subjectName }} / Courses</h2>

        <button 
          @click="toggleForm" 
          class="mb-4 bg-blue-500 text-white rounded p-2 transition duration-200 hover:bg-blue-600"
        >
          {{ showForm ? 'Cancel' : 'Create Course' }}
        </button>

        <form 
          v-if="showForm" 
          @submit.prevent="submitCourse" 
          class="bg-white shadow-md rounded p-4 mb-4"
        >
          <h3 class="text-xl font-semibold mb-4">{{ editingCourse ? 'Edit Course' : 'Add Course' }}</h3>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700" for="title">Course Title</label>
            <input
              v-model="newCourse.title"
              type="text"
              placeholder="Course Title"
              class="border rounded p-2 w-full"
              required
            />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700" for="description">Course Description</label>
            <textarea
              v-model="newCourse.description"
              placeholder="Course Description"
              class="border rounded p-2 w-full"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="bg-green-500 text-white rounded p-2 w-full transition duration-200 hover:bg-green-600"
          >
            {{ editingCourse ? 'Update Course' : 'Add Course' }}
          </button>
        </form>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="course in courses" 
            :key="course.id" 
            class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 class="font-semibold">{{ course.title }}</h3>
              <p class="text-gray-700">{{ course.description }}</p>
            </div>
            <div class="mt-4 flex space-x-2">
              <button 
                @click="populateCourse(course)" 
                class="text-blue-500 outline outline-blue-500 rounded px-2 py-1 transition duration-200 hover:bg-blue-500 hover:text-white"
              >
                Edit
              </button>
              <button 
                @click="deleteCourse(course.id)" 
                class="text-red-500 outline outline-red-500 rounded px-2 py-1 transition duration-200 hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
              <button 
                @click="viewModules(course.id)" 
                class="text-green-500 outline outline-green-500 rounded px-2 py-1 transition duration-200 hover:bg-green-500 hover:text-white"
              >
                View Modules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRoute, useRouter } from 'vue-router';
import useCourses from '@/composables/useCourses';

const route = useRoute();
const router = useRouter();
const subjectId = ref(route.query.subjectId);
const subjectName = ref(route.query.subjectName);

const { courses, newCourse, createCourse, editCourse, deleteCourse, clearNewCourse, fetchCoursesBySubject } = useCourses();
const showForm = ref(false);
const editingCourse = ref(null);

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    clearNewCourse();
  }
};

const populateCourse = (course) => {
  newCourse.value.title = course.title;
  newCourse.value.description = course.description;
  editingCourse.value = course;
  showForm.value = true;
};

const submitCourse = async () => {
  if (!editingCourse.value) {
    await createCourse();
  } else {
    await editCourse(editingCourse.value.id);
  }
  clearNewCourse();
  showForm.value = false;
};

const viewModules = (courseId) => {
  router.push({ name: 'Modules', params: { courseId, subjectId, subjectName } });
};

onMounted(() => {
  fetchCoursesBySubject(subjectId.value); 
});
</script>
