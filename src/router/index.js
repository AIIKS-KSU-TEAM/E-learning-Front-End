import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Layouts/Layout.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Registration/Login.vue";
import Signup from "@/views/Registration/Signup.vue";
import HomeView from "@/views/HomeView.vue";
import CourseList from "@/views/Courses/CourseList.vue";
import Teacher from "@/views/Teachers/ListTeachers.vue";
import TeacherCreate from "@/views/Teachers/CreateTeacher.vue";
import CourseForm from "@/views/Courses/CourseForm.vue";
import ModuleContent from "@/views/Courses/ModuleContent.vue";
import Course from "@/views/Courses/Course.vue";
import CourseM from "@/views/Courses/CourseM.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/coursel",
      name: "coursel",
      component: CourseM,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/course",
      name: "course",
      component: Course,
    },
    {
      path: "/course-list",
      name: "course-list",
      component: CourseList,
    },
    {
      path: "/modules",
      name: "modules",
      component: () => import("@/views/Modules/ModuleList.vue"),
    },
    {
      path: "/modules/:id/contents/create",
      name: "modules-contents-create",
      component: () => import("@/views/Modules/Contents/CreateView.vue"),
    },
    {
      path: "/create-course",
      name: "create-course",
      component: CourseForm,
    },
    {
      path: "/edit-course/:id",
      name: "edit-course",
      component: CourseForm,
    },
    {
      path: "/teacher",
      name: "teacher",
      component: Teacher,
    },
    {
      path: "/create-teacher",
      name: "create-teacher",
      component: TeacherCreate,
    },
    {
      path: '/module/:module_id/content',
      component: ModuleContent,
      name: 'moduleContent'
    },
    {
      path: "/",
      component: Layout,
      children: [
        { path: "", component: Dashboard },
        { path: "teacher", component: Teacher },
        // Add other routes here that use the layout
      ],
    },
  ],
});

export default router;
