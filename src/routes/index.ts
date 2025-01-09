import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import SettingPage from "../components/pages/SettingPage.vue";
import EmployeePage from "../components/pages/EmployeePage.vue";
import No1 from "../components/No1.vue";
import No2 from "../components/No2.vue";
import No3 from "../components/No3.vue";
import No4 from "../components/No4.vue";
import No5 from "../components/No5.vue";
import EmployeeList from "../components/EmployeeList.vue";
import EmployeeForm from "../components/atoms/EmployeeForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
        path: "/employee",
        name: "employee",
        component: EmployeePage,
        children: [
          {
            path: "/employee/create",
            name: "createEmployee",
            component: EmployeeForm,
          },
          {
            path: "/employee/edit/:id",
            name: "editEmployee",
            component: No2,
          },
          {
            path: "/employee/manage/:id",
            name: "manageEmployee",
            component: No2,
          },
          {
            path: "/employee/view/:id",
            name: "viewEmployee",
            component: No2,
          },

        ],
      },
      {
        path: "/setting",
        redirect: "/setting/no1",
      },
    {
      path: "/setting",
      name: "setting",
      component: SettingPage,
      children: [
        {
            path: "/setting/employee",
            name: "settingEmployee",
            component: No1,
          },
          {
            path: "/setting/position",
            name: "settingPosition",
            component: No2,
          },
        {
          path: "/setting/no1",
          name: "no1",
          component: No1,
        },
        {
          path: "/setting/no2",
          name: "no2",
          component: No2,
        },
        {
          path: "/setting/no3",
          name: "no3",
          component: No3,
        },
        {
          path: "/setting/no4",
          name: "no4",
          component: No4,
        },
        {
          path: "/setting/no5",
          name: "no5",
          component: No5,
        },
        {
          path: "/setting/no7",
          name: "no7",
          component: EmployeeList,
        },
      ],
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     redirect: "/home",
    // }
  ],
});

export default router;
