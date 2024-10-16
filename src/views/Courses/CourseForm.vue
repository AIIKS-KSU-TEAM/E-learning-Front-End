<template>
  <Navbar />
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <main class="flex-1 overflow-auto p-6">
        <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            {{ isEdit ? "Edit Course" : "Create Course" }}
          </h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                id="title"
                v-model="course.title"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label for="slug" class="block text-sm font-medium text-gray-700"
                >Slug</label
              >
              <input
                type="text"
                id="slug"
                v-model="course.slug"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="overview"
                class="block text-sm font-medium text-gray-700"
                >Overview</label
              >
              <textarea
                id="overview"
                v-model="course.overview"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                v-model="course.subject"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {{ isEdit ? "Update" : "Create" }}
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/axiosconfig/axiosInstance";
import { createCourse, updateCourse } from "@/api";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
  },
  setup() {
    const isEdit = ref(false);
    const course = ref({
      title: "",
      slug: "",
      overview: "",
      subject: "",
    });

    const route = useRoute();
    const router = useRouter();

    const fetchCourse = async (id) => {
      try {
        const response = await axiosInstance.get(`course/courses/${id}/`);
        course.value = response.data;
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    const handleSubmit = async () => {
      try {
        const courseId = route.params.id;
        if (isEdit.value) {
          await updateCourse(courseId, course.value);
        } else {
          await createCourse(course.value);
        }
        router.push({ name: "course-list" });
      } catch (error) {
        console.error("Error saving course:", error);
        alert("There was an error saving the course. Please try again.");
      }
    };

    onMounted(() => {
      const courseId = route.params.id;
      if (courseId) {
        isEdit.value = true;
        fetchCourse(courseId);
      }
    });

    return {
      isEdit,
      course,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
