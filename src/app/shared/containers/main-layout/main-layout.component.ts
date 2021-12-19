import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef, ViewChild } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { delay } from 'rxjs/operators'; 
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  currentUser = this.authService.getCurrentUser();

  constructor(private authService: AuthService,
              private observer: BreakpointObserver,
            ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}

