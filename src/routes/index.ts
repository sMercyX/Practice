import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import SettingPage from "../components/pages/SettingPage.vue";
import EmployeePage from "../modules/employee/EmployeeIndex.vue";
import No1 from "../components/practice/No1.vue";
import No2 from "../components/practice/No2.vue";
import No3 from "../components/practice/No3.vue";
import No4 from "../components/practice/No4.vue";
import No5 from "../components/practice/No5.vue";
import No6 from "../components/practice/No6.vue";
// import EmployeeList from "../components/practice/No7EmployeeList.vue";
import EmployeeForm from "../modules/employee/EmployeeAddEdit.vue";
import TeamList from "../modules/team/TeamList.vue";
import PositionList from "../modules/position/PositionList.vue";
import EmployeeView from "../modules/employee/EmployeeView.vue";

const router = createRouter(
  {
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
        children: [
          {
            path: "",
            name: "employee",
            component: EmployeePage,
          },
          {
            path: "create",
            name: "createEmployee",
            component: EmployeeForm,
          },
          {
            path: "edit/:employeeId",
            name: "editEmployee",
            component: EmployeeForm,
          },
          {
            path: "view/:employeeId",
            name: "viewEmployee",
            component: EmployeeView,
          },
        ],
      },

      {
        path: "/setting",
        redirect: "/setting/team",
      },
      {
        path: "/setting",
        name: "setting",
        component: SettingPage,
        children: [
          {
            path: "team",
            name: "settingTeam",
            component: TeamList,
          },
          {
            path: "position",
            name: "settingPosition",
            component: PositionList,
            props: { type: "position" },
          },

          {
            path: "no1",
            name: "no1",
            component: No1,
          },
          {
            path: "no2",
            name: "no2",
            component: No2,
          },
          {
            path: "no3",
            name: "no3",
            component: No3,
          },
          {
            path: "no4",
            name: "no4",
            component: No4,
          },
          {
            path: "no5",
            name: "no5",
            component: No5,
          },
          {
            path: "no6",
            name: "no6",
            component: No6,
          },
          {
            path: "no7",
            name: "no7",
            component: No6,
          },
        ],
      },
    ],
  }
  // {
  //     path: "/:pathMatch(.*)*",
  //     redirect: "/home",
  // }
);

export default router;
