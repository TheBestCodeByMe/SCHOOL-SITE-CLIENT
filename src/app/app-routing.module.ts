import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MainComponent} from "./main/main.component";
import {AboutSiteComponent} from "./aboutSite/aboutSite.component";
import {AboutStudentComponent} from "./aboutStudent/aboutStudent.component";
import {AnalyticComponent} from "./analytic/analytic.component";
import {AskQuestionComponent} from "./askQuestion/ask-question.component";
import {DiaryComponent} from "./diary/diary.component";
import {EditDiaryComponent} from "./editDiary/edit-diary.component";
import {EditUsersComponent} from "./editUsers/edit-users.component";
import {EmployeeComponent} from "./employee/employee.component";
import {MenuDirectorComponent} from "./menuDirector/menu-director.component";
import {UpdateUsersComponent} from "./updateUser/update-users.component";
import {MenuStudentComponent} from "./menuStudent/menu-student.component";
import {MenuTeacherComponent} from "./menuTeacher/menu-teacher.component";
import {RegistrationComponent} from "./registration/registration.component";
import {SignInComponent} from "./signIn/sign-in.component";
import {SheduleComponent} from "./shedule/shedule.component";


const routes: Routes = [

  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'aboutSite', component: AboutSiteComponent},
  {path: 'aboutStudents', component: AboutStudentComponent},
  {path: 'dataAnalytics', component: AnalyticComponent},
  {path: 'askQuestion', component: AskQuestionComponent},
  {path: 'diary', component: DiaryComponent},
  {path: 'editDiary', component: EditDiaryComponent},
  {path: 'editUsers', component: EditUsersComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'menuDirector', component: MenuDirectorComponent},
  {path: 'menuStudent', component: MenuStudentComponent},
  {path: 'menuTeacher', component: MenuTeacherComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'updateUsers', component: UpdateUsersComponent},
  {path: 'add', component: CreateUserComponent},
  {path: 'schedule', component: SheduleComponent},

  {path: 'users', component: UserListComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'update/:id', component: UpdateUserComponent},
  {path: 'details/:id', component: UserDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
