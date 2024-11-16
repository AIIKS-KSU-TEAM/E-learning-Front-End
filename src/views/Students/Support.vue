<template>
    <div class="h-screen bg-gray-50 flex flex-col">
      <!-- Navbar Component -->
      <Navbar />
  
      <!-- Main Container with Sidebar and Profile Content -->
      <div class="flex flex-1">
        <!-- Sidebar on the left -->
        <StdSidebar class="w-64 lg:w-72" :items="sidebarItems" />
  
        <!-- Profile Content Area -->
        <div class="flex-1 p-6">
          <div class="container mx-auto bg-white rounded-lg shadow-lg">
  
            <!-- Ticket Submission Form -->
            <div class="p-6 bg-blue-50 rounded-t-lg">
              <h2 class="text-2xl font-bold flex items-center text-gray-800">
                <i class="fas fa-ticket-alt mr-2"></i> Submit a Ticket
              </h2>
            </div>
  
            <div class="p-6">
              <div class="mb-4">
                <label class="block font-semibold text-gray-700">Subject:</label>
                <input v-model="ticket.subject" type="text" class="border rounded p-2 w-full" />
              </div>
              <div class="mb-4">
                <label class="block font-semibold text-gray-700">Description:</label>
                <textarea v-model="ticket.description" class="border rounded p-2 w-full" rows="4"></textarea>
              </div>
              <button @click="submitTicket" class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 flex items-center">
                <i class="fas fa-paper-plane mr-2"></i> Submit Ticket
              </button>
            </div>
  
            <!-- FAQ Section -->
            <div class="p-6 mt-6 bg-blue-50 rounded-t-lg">
              <h2 class="text-2xl font-bold flex items-center text-gray-800">
                <i class="fas fa-question-circle mr-2"></i> Frequently Asked Questions
              </h2>
            </div>
  
            <div class="p-6">
              <div v-for="(faq, index) in faqs" :key="index" class="mb-6">
                <div class="flex items-center mb-2">
                  <i class="fas fa-chevron-circle-down mr-2 text-blue-500"></i>
                  <h3 class="text-lg font-semibold text-gray-800">{{ faq.question }}</h3>
                </div>
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axiosInstance from '@/axiosconfig/axiosInstance';
  import Navbar from '@/components/Navbar.vue';
  import StdSidebar from '@/components/StdSidebar.vue';
  
  // Data for the ticket form
  const ticket = ref({
    subject: '',
    description: ''
  });
  
  // Dummy FAQ data
  const faqs = ref([
    { question: 'How do I submit a ticket?', answer: 'To submit a ticket, fill out the form above with a subject and description.' },
    { question: 'Where can I track my tickets?', answer: 'You can track your tickets from the Dashboard under the Tickets section.' },
    { question: 'How long does it take to resolve a ticket?', answer: 'Tickets are usually resolved within 48 hours.' },
    { question: 'Can I update my ticket after submission?', answer: 'Yes, you can update your ticket by contacting support.' },
    { question: 'What is the priority level of my ticket?', answer: 'Tickets are prioritized based on urgency and impact.' },
  ]);
  
  const sidebarItems = ref([]);
  
  const submitTicket = async () => {
    try {
      // Replace with actual API call to submit a ticket
      await axiosInstance.post('/api/support/tickets/', ticket.value);
      alert('Ticket submitted successfully!');
      ticket.value = { subject: '', description: '' }; // Clear form after submission
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Failed to submit ticket. Please try again later.');
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  
  .faq-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .faq-item:last-child {
    border-bottom: none;
  }
  
  .faq-item h3 {
    font-size: 1.2rem;
    color: #333;
  }
  
  .faq-item p {
    font-size: 1rem;
    color: #555;
  }
  </style>
  
  <!-- Import Font Awesome for Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  