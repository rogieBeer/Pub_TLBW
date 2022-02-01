import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Quiz from "@/views/Quiz.vue";
import Species from "@/views/Species.vue";
import Search from "@/views/Search.vue";
import Edit from "@/views/Edit.vue";
import Add from "@/views/Add.vue";
import Active from "@/views/Quizstart.vue";
import Create from "@/views/QuizCreate.vue";
import Delete from "@/views/QuizDelete.vue";
import Privacy from "@/views/Privacy.vue";
import Response from "@/views/Response.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
  {
    path: "/species",
    name: "Species",
    component: Species,
  },
  {
    // This also will contain the delete function for species
    path: "/species/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/species/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/species/add",
    name: "Add",
    component: Add,
  }
  ,
  {
    path: "/quiz/active",
    name: "Active",
    component: Active,
  }
  ,
  {
    path: "/quiz/edit",
    name: "Delete",
    component: Delete,
  },
  {
    path: "/quiz/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/about/privacy",
    name: "Privacy",
    component: Privacy,
  }
  ,
  {
    path: "/response",
    name: "Response",
    component: Response,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;