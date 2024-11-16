<template>
    <div class="h-screen bg-gray-50 flex flex-col">
      <!-- Navbar Component -->
      <Navbar />
  
      <!-- Main Container with Sidebar and Content Area -->
      <div class="flex flex-1">
        <!-- Sidebar on the left -->
        <StdSidebar class="w-64 lg:w-72" :items="sidebarItems" />
  
        <!-- Assignment Submission Content Area -->
        <div class="flex-1 p-8">
          <div class="max-w-3xl mx-auto p-8 border rounded-lg shadow-xl bg-white">
            <div class="flex items-center mb-6">
              <i class="fas fa-file-upload h-8 w-8 text-blue-600 mr-2"></i>
              <h2 class="text-3xl font-bold text-blue-600">Assignment Submission</h2>
            </div>
  
            <p class="text-gray-600 mb-6 text-lg">{{ assignment.title }}</p>
            <p v-if="isPastDeadline" class="text-red-500 mb-6 text-md flex items-center">
              <i class="fas fa-clock mr-2"></i> The submission deadline has passed.
            </p>
  
            <!-- Submission Form -->
            <form v-if="!isPastDeadline" @submit.prevent="submitAssignment" class="flex flex-col gap-5">
              <div>
                <label for="module" class="text-gray-600 font-semibold">Select Module</label>
                <select v-model="selectedModule" id="module" class="border p-3 rounded-lg w-full">
                  <option value="" disabled>Select a module</option>
                  <option v-for="module in modules" :key="module.id" :value="module.id">
                    {{ module.title }}
                  </option>
                </select>
              </div>
  
              <div>
                <label for="title" class="text-gray-600 font-semibold">Title</label>
                <input
                  type="text"
                  v-model="title"
                  id="title"
                  class="border p-3 rounded-lg w-full"
                  placeholder="Enter the title of your assignment"
                />
              </div>
  
              <label class="flex items-center border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-400 transition">
                <input type="file" @change="handleFileUpload" class="hidden" />
                <i class="fas fa-upload text-blue-500 mr-2"></i>
                <span class="text-gray-500">{{ file ? file.name : "Choose a file to submit" }}</span>
              </label>
  
              <button
                type="submit"
                class="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition font-semibold"
              >
                <i class="fas fa-upload"></i>
                <span>Submit Assignment</span>
              </button>
            </form>
  
            <!-- Display Score for Current Assignment -->
            <div v-if="assignment.score !== null" class="mt-8 p-4 rounded-lg bg-green-100 text-green-700 flex items-center gap-2">
              <i class="fas fa-check-circle h-6 w-6"></i>
              <span>Your Score: {{ assignment.score }}</span>
            </div>
            <div v-else class="mt-8 p-4 rounded-lg bg-yellow-100 text-yellow-700 flex items-center gap-2">
              <i class="fas fa-info-circle h-6 w-6"></i>
              <span>Score not available yet.</span>
            </div>
            
            <!-- List of Submitted Assignments -->
            <div class="mt-10">
              <h3 class="text-xl font-semibold text-gray-700 mb-6">Your Submissions</h3>
              <div v-if="submittedAssignments.length > 0">
                <div v-for="submission in submittedAssignments" :key="submission.id" class="p-4 mb-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                  <div>
                    <p class="text-gray-800 font-semibold">{{ submission.title }}</p>
                    <p class="text-sm text-gray-500">{{ submission.module.title }}</p>
                  </div>
                  <div>
                    <span v-if="submission.score !== null" class="text-green-600 font-semibold">Score: {{ submission.score }}</span>
                    <span v-else class="text-yellow-600">Score pending</span>
                  </div>
                </div>
              </div>
              <p v-else class="text-gray-500">No submissions found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axiosInstance from '@/axiosconfig/axiosInstance';
  import Navbar from '@/components/Navbar.vue';
  import StdSidebar from '@/components/StdSidebar.vue';
  
  const assignment = ref({});
  const isPastDeadline = ref(false);
  const assignmentId = 1; // Replace with dynamic ID if needed
  const file = ref(null);
  const title = ref('');
  const selectedModule = ref('');
  const modules = ref([]);
  const sidebarItems = ref([]);
  const submittedAssignments = ref([]);
  
  // Fetch assignment details
  const fetchAssignment = async () => {
    try {
      const response = await axiosInstance.get(`api/assignments/${assignmentId}/`);
      assignment.value = response.data;
      const deadlineDate = new Date(assignment.value.deadline);
      isPastDeadline.value = new Date() > deadlineDate;
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };
  
  // Fetch available modules
  const fetchModules = async () => {
    try {
      const response = await axiosInstance.get('/api/modules/');
      modules.value = response.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };
  
  // Fetch only submitted assignments by the logged-in user
  const fetchSubmittedAssignments = async () => {
    try {
      const response = await axiosInstance.get('/api/assignments/');
      submittedAssignments.value = response.data;
    } catch (error) {
      console.error('Error fetching submitted assignments:', error);
    }
  };
  
  // Handle file upload
  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  // Handle assignment submission
  const submitAssignment = async () => {
    if (!file.value || !selectedModule.value || !title.value) {
      alert('Please select a module, provide a title, and upload a file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('module', selectedModule.value);
    formData.append('title', title.value);
    formData.append('file', file.value);
  
    try {
      await axiosInstance.post('api/assignments/', formData);
      alert('Assignment submitted successfully!');
      fetchAssignment();
      fetchSubmittedAssignments(); // Refresh the submissions list after submission
    } catch (error) {
      alert('Error submitting assignment: ' + (error.response?.data?.error || error.message));
    }
  };
  
  onMounted(() => {
    fetchAssignment();
    fetchModules();
    fetchSubmittedAssignments();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  </style>
  