import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./_Components/navbar/navbar.component";
import { FooterComponent } from "./_Components/footer/footer.component";
import { AuthService } from './_Services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Front';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.startTokenMonitoring();
  }
}
