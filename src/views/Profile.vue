<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Container with Sidebar and Profile Content -->
    <div class="flex min-h-screen bg-gray-100">
      <Sidebar />

      <!-- Profile Content Area -->
      <div class="flex-1 p-6">
        <div class="container mx-auto bg-white rounded-lg shadow-lg">
          <!-- Profile Header -->
          <div class="p-6 bg-blue-50 rounded-t-lg flex items-center justify-between">
            <h2 class="text-2xl font-bold flex items-center text-gray-800">
              <i class="fas fa-user-circle mr-2"></i> User Profile
            </h2>
          </div>

          <!-- Profile Form -->
          <div class="p-6">
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">Name:</label>
              <input v-model="profile.name" type="text" class="border rounded p-2 w-full" />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">Email:</label>
              <input v-model="profile.email" type="email" class="border rounded p-2 w-full" disabled />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">Phone:</label>
              <input v-model="profile.phone" type="text" class="border rounded p-2 w-full" />
            </div>
            <button @click="saveProfile" class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 flex items-center">
              <i class="fas fa-save mr-2"></i> Save Profile
            </button>
          </div>

          <!-- Change Password Form -->
          <div class="p-6 border-t border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Change Password</h3>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">Current Password:</label>
              <input v-model="passwordForm.currentPassword" type="password" class="border rounded p-2 w-full" />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">New Password:</label>
              <input v-model="passwordForm.newPassword" type="password" class="border rounded p-2 w-full" />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700">Confirm New Password:</label>
              <input v-model="passwordForm.confirmNewPassword" type="password" class="border rounded p-2 w-full" />
            </div>
            <button @click="changePassword" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 flex items-center">
              <i class="fas fa-key mr-2"></i> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import useProfile from "@/composables/useProfile";

export default {
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    const { profile, saveProfile, passwordForm, changePassword } = useProfile();
    return { profile, saveProfile, passwordForm, changePassword };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

<!-- Import Font Awesome for Icons -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
>
</link>