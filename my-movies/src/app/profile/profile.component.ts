import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.user = response;
    });
  }
}
