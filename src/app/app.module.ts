import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserListComponent} from './user-list/user-list.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AlertModule} from "ngx-bootstrap/alert";
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

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserDetailsComponent,
    UserListComponent,
    UpdateUserComponent,
    MainComponent,
    AboutSiteComponent,
    AboutStudentComponent,
    AnalyticComponent,
    AskQuestionComponent,
    DiaryComponent,
    EditDiaryComponent,
    EditUsersComponent,
    EmployeeComponent,
    MenuDirectorComponent,
    UpdateUsersComponent,
    MenuStudentComponent,
    MenuTeacherComponent,
    RegistrationComponent,
    SignInComponent,
    SheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
