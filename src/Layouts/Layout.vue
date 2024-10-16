<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <main class="flex-1 p-6">
      <!-- Dynamic content will be injected here -->
      <router-view />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
