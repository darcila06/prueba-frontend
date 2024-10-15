import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {
  faEnvelope = faEnvelope;
  correo = 'consultas@correo.com'
  faLocationDot = faLocationDot
  location = 'Av 6. de Julio Nro 8 - Bogotá - Colombia'
  faPhone = faPhone
  phone = '(+57) 311-865-4251'
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram
}
