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
import Zoom from "@/views/Zoom.vue";
import Profile from "@/views/Profile.vue";
import SubjectList from "@/views/Students/SubjectList.vue";
import CoursesList from "@/views/Students/CoursesList.vue";
import ModulesList from "@/views/Students/ModulesList.vue";
import ContentList from "@/views/Students/ContentList.vue";
import StdProfile from "@/views/Students/StdProfile.vue";
import StdClassroom from "@/views/Students/StdClassroom.vue";
import Support from "@/views/Students/Support.vue";
import AssignmentForm from "@/views/Students/AssignmentForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/subjects1', component: SubjectList, name: 'subjects' },
    { path: '/subjects1/:subjectId/courses', component: CoursesList, name: 'courses' },
    { path: '/subjects1/:subjectId/courses/:courseId/modules', component: ModulesList, name: 'modules' },
    { path: '/subjects1/:subjectId/courses/:courseId/modules/:moduleId/contents', component: ContentList, name: 'contents' },
    { path: '/stdprofile', component: StdProfile, name: 'stdprofile' },
    { path: '/stdclassroom', component: StdClassroom, name: 'stdclassroom' },
    { path: '/support', component: Support, name: 'support' },
    { path: '/assignments', component: AssignmentForm, name: 'assignments' },
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
      path: "/subjects",
      name: "Subjects",
      component: Subjects,
    },
    {
      path: "/courses",
      name: "Courses",
      component: Courses,
    },
    {
      path: "/subjects/:subjectId/courses/:courseId/modules",
      name: "Modules",
      component: Modules,
      props: true,
    },
    {
      path: "/modules/:moduleId",
      name: "ModuleContents",
      component: ModuleContents,
    },
    {
      path: "/classroom",
      name: "classroom",
      component: Zoom,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
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
