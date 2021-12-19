import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.clearLsItems();
  }

  ngOnDestroy(): void {
  }

}
