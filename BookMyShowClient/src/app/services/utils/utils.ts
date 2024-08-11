import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function httpError(error: HttpErrorResponse) {
    let msg = '';
    let errorCode = error.status;
    
    if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        msg = error.error.message;
    } else {
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(msg); 
    
    return throwError(() => ({ errorCode, msg }));
}
