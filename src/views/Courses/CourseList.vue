<template>
  <div>
    <Navbar />
    <div class="flex h-screen">
      <Sidebar />
      <div class="flex-1 flex flex-col">
        <main class="flex-1 overflow-auto p-6">
          <h2 class="text-2xl font-semibold mb-4">Courses</h2>
          <router-link to="/create-course" class="btn btn-primary mb-2"
            >Create Course</router-link
          >
          <table class="table w-full mt-4">
            <thead>
              <tr>
                <th class="text-left">Title</th>
                <th class="text-left">Overview</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course.id">
                <td>{{ course.title }}</td>
                <td>{{ course.overview }}</td>
                <td>
                  <router-link
                    :to="{ name: 'edit-course', params: { id: course.id } }"
                    class="btn btn-warning mr-2"
                    >Edit</router-link
                  >
                  <button
                    @click="deleteCourse(course.id)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCourses, deleteCourse as apiDeleteCourse } from "@/api";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  setup() {
    const courses = ref([]);

    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        courses.value = response.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const deleteCourse = async (id) => {
      if (confirm("Are you sure you want to delete this course?")) {
        try {
          await apiDeleteCourse(id);
          fetchCourses();
        } catch (error) {
          console.error("Error deleting course:", error);
        }
      }
    };

    onMounted(() => {
      fetchCourses();
    });

    return {
      courses,
      deleteCourse,
    };
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #dee2e6;
}

.table th {
  background-color: #f8f9fa;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
