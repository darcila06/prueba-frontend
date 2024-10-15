import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [{
    path: 'data',
    component: UsersComponent
}, {
    path: 'contact',
    component: ContactComponent
}, {
    path: '',
    redirectTo: '/contact',
    pathMatch: 'full'
},];
