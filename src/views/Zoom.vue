<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />
    
    <!-- Main Container with Sidebar and Content Area -->
    <div class="flex min-h-screen bg-gray-100">
      <Sidebar />

      <!-- Content Area -->
      <div class="flex-1 p-6">
        <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
          <!-- Classroom Meeting Section -->
          <div class="p-6 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                <i class="fas fa-chalkboard-teacher mr-2"></i> Classroom
              </h2>
              <button
                @click="startMeeting"
                class="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <i class="fas fa-video mr-2"></i> Start Meeting
              </button>
            </div>
            <div ref="meet" class="meeting-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      jitsiApi: null,
    };
  },
  methods: {
    startMeeting() {
      if (!this.$refs.meet) {
        console.error("Meeting container is not available");
        return;
      }

      const domain = "meet.jit.si";
      const options = {
        roomName: "ClassroomMeeting_" + Date.now(),
        parentNode: this.$refs.meet,
        configOverwrite: {},
        interfaceConfigOverwrite: {},
        width: "100%",
        height: "100%",
      };

      this.jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = this.startMeeting;
    document.body.appendChild(script);
  },
  beforeDestroy() {
    if (this.jitsiApi) {
      this.jitsiApi.dispose();
    }

    const script = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
    if (script) {
      document.body.removeChild(script);
    }
  },
};
</script>

<style scoped>
.meeting-container {
  width: 100%;
  height: 80vh;
  max-height: 600px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}
</style>

<!-- Import Font Awesome for Icons -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
></link>
