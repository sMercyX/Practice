import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import SettingPage from "../components/pages/SettingPage.vue";
import EmployeePage from "../modules/employee/pages/EmployeePage.vue";
import No1 from "../components/No1.vue";
import No2 from "../components/No2.vue";
import No3 from "../components/No3.vue";
import No4 from "../components/No4.vue";
import No5 from "../components/No5.vue";
import EmployeeList from "../components/No7EmployeeList.vue";
import EmployeeForm from "../modules/employee/forms/EmployeeForm.vue";
import TeamForm from "../modules/team/Form/TeamForm.vue";
import TeamList from "../modules/team/pages/TeamList.vue";
import PositionList from "../modules/position/pages/PositionList.vue";
import PositionForm from "../modules/position/Form/PositionForm.vue";

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
        name: "employee",
        component: EmployeePage,
        children: [
          {
            path: "/employee/create",
            name: "createEmployee",
            component: EmployeeForm,
          },
          {
            path: "/employee/edit/:employeeId",
            name: "editEmployee",
            component: EmployeeForm,
          },
          // {
          //   path: "/employee/view/:employeeId",
          //   name: "viewEmployee",
          //   component: No2,
          // },
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
            path: "no7",
            name: "no7",
            component: EmployeeList,
          },
        ],
      },
      {
        path: "/setting/team/create",
        name: "settingCreateTeam",
        component: TeamForm,
      },
      {
        path: "/setting/team/edit/:teamId",
        name: "settingEditTeam",
        component: TeamForm,
      },
      {
        path: "/setting/position/create",
        name: "settingCreatePosition",
        component: PositionForm,
      },
      {
        path: "/setting/position/edit/:positionId",
        name: "settingEditPosition",
        component: PositionForm,
      },
    ],
  }
  // {
  //     path: "/:pathMatch(.*)*",
  //     redirect: "/home",
  // }
);

export default router;
