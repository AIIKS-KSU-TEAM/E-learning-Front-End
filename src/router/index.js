import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Layouts/Layout.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Registration/Login.vue";
import Signup from "@/views/Registration/Signup.vue";
import HomeView from "@/views/HomeView.vue";
import Teacher from "@/views/Teachers/ListTeachers.vue";
import TeacherCreate from "@/views/Teachers/CreateTeacher.vue";
import Subjects from "@/views/Courses/Subjects.vue";
import Courses from "@/views/Courses/Courses.vue";
import Modules from "@/views/Courses/Modules.vue";
import ModuleContents from "@/views/Courses/ModuleContents.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      path: '/subjects',
      name: 'Subjects',
      component: Subjects,
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },
    {
      path: '/modules',
      name: 'Modules',
      component: Modules,
    },
    {
      path: '/module-contents',
      name: 'ModuleContents',
      component: ModuleContents,
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
      component: ModuleContents,
      name: 'moduleContents'
    },
    {
      path: "/",
      component: Layout,
      children: [
        { path: "", component: Dashboard },
        { path: "teacher", component: Teacher },
      ],
    },
  ],
});

export default router;
