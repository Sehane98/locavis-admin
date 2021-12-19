import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from './snack-bar.service';
import {AuthService} from '../auth.service';
import {Authority} from '../../enums/authority.enum';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private readonly Delay = 1000;

  constructor(private router: Router,
              private snackBarService: SnackBarService,
              private authService: AuthService) { }

  routeWithDelay(route: string[], msg?: string, routeIns?: ActivatedRoute, delay?: number): void {
    if (msg) {
      this.snackBarService.success(msg);
    }

    setTimeout(() => this.router.navigate(route, {relativeTo: routeIns}), delay || this.delay);
  }

  get delay(): number {
    return this.Delay;
  }


}
