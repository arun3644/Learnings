import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DoctorsActions } from "./doctors.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs";

@Injectable()
export class DoctorsEffects {
    loadDoctors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.loadDoctors),
            switchMap(() => {
                const current_user = this.authService.getCurrentUser();    
                if (current_user?.role === 'Doctor') {
                   return of(DoctorsActions.loadDoctorsSuccess({doctors: []}));
                }  
                return this.api.getAll<any[]>('doctors').pipe(
                    map(doctors => {
                        return DoctorsActions.loadDoctorsSuccess({doctors: doctors || []});
                    }),
                    catchError(error => {
                       return of(DoctorsActions.loadDoctorsFailure({error: error.message}));
                    })
                );
            })
        )
    );

    loadMetaData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.loadMetadata),
            switchMap(() => {
                return this.api.getMetadata<any[]>('doctors').pipe(
                    map(metadata => {
                        return DoctorsActions.loadMetadataSuccess({metaData: metadata || []});
                    }),
                    catchError(error => {
                       return of(DoctorsActions.loadDoctorsFailure({error: error.message}));
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private authService: AuthService, private api: ApiService) {}
}
