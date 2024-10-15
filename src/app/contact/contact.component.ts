import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, ContactInfoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
