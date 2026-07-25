import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import * as LoginActions  from "./login.actions";
import { ApiService } from "../../services/api.service";

@Injectable()

export class LoginEffects{
    loadLogin$ = createEffect(() =>
     this.actions$.pipe(
        ofType(LoginActions.loadLogin),
        switchMap(() =>
            this.api.getMetadata<any[]>('login').pipe(
                map(loginData => LoginActions.loadLoginSuccess({loginData})),
                catchError( err => of(LoginActions.loadLoginFailure({ error: err.message})))
            )
        )
     )
    );
    constructor(private actions$: Actions, private api: ApiService){}
}