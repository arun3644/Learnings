import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginActions } from './login.actions';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Injectable()
export class LoginEffects {
 login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => {
            if (response.success && response.token && response.user) {
              return LoginActions.loginSuccess({
                user: response.user,
                token: response.token,
                message: response.message
              });
            } else {
              return LoginActions.loginFailure({
                error: response.message || 'Login failed'
              });
            }
          }),
          catchError(error => {
            const message = error.error?.message || error.message || 'Login failed';
            return of(LoginActions.loginFailure({ error: message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/app']);
      })
    ),
    { dispatch: false }
  );

   register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.register),
      switchMap(({ role, credentials }) =>
        this.authService.register(role, credentials).pipe(
          map(response => {
            if (response.success) {
              return LoginActions.registerSuccess({
                message: response.message || 'Registration successful'
              });
            } else {
              return LoginActions.registerFailure({
                error: response.message || 'Registration failed'
              });
            }
          }),
          catchError(error => {
            const message = error.error?.error || error.error?.message || 'Registration failed';
            return of(LoginActions.registerFailure({ error: message }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.registerSuccess),
      tap(() => {
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }),
      map(() => LoginActions.logoutSuccess())
    )
  );

   validateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.validateToken),
      switchMap(({ token }) =>
        this.authService.validateToken(token).pipe(
          map(isValid => {
            if (isValid) {
              const user = this.authService.getCurrentUser();
              return LoginActions.validateTokenSuccess({ user });
            } else {
              return LoginActions.validateTokenFailure();
            }
          }),
          catchError(() => of(LoginActions.validateTokenFailure()))
        )
      )
    )
  );

  validateTokenFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.validateTokenFailure),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  loadLoginMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loadLoginMetadata),
      switchMap(() =>
        this.api.getMetadata<any[]>('login').pipe(
          map(loginData => LoginActions.loadLoginMetadataSuccess({ loginData })),
          catchError(err => of(LoginActions.loadLoginMetadataFailure({ error: err.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {}
}