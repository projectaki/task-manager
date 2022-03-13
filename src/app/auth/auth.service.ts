import { Injectable } from '@angular/core';
import { AuthOptions, OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, catchError, combineLatest, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly error = new BehaviorSubject<any>(false);
  private readonly isLoading = new BehaviorSubject(true);

  /** Loading observable which emits false when the login is
   * successfully completed. Initial value: true.
   */
  public error$ = this.error.asObservable();

  /** Loading observable which emits false when the login is
   * successfully completed. Initial value: true.
   */
  public isLoading$ = this.isLoading.asObservable();

  /**
   * Observable which emits true if the user is authenticated. This observable
   * relies on the isLoading$ observable, which means it will only emit its first value,
   * once the authentication has successfully completed. This is neccessary in Auth guards,
   * when all the routes have guards combined with auto login. This will prevent timing issue,
   * infinite loop redirects.
   */
  public isAuthenticated$ = combineLatest([this.isLoading$, this.auth.isAuthenticated$]).pipe(
    filter(([isLoading, _]) => !isLoading),
    map(([isLoading, { isAuthenticated }]) => ({
      isLoading,
      isAuthenticated,
    }))
  );

  public userData$ = this.auth.userData$;

  constructor(private auth: OidcSecurityService) {}

  initializeAuth() {
    return this.auth.checkAuth().pipe(tap(() => this.isLoading.next(false)));
  }

  /**
   * Log out and revoke tokens (also refresh tokens).
   * @returns Return OidcSecurityService.logoffAndRevokeTokens() observable.
   */
  logout() {
    return this.auth.logoffAndRevokeTokens();
  }

  /**
   * Initialize login flow, redirect to Identity provider.
   */
  login(authOptions?: AuthOptions) {
    if (authOptions) this.auth.authorize(undefined, authOptions);
    else this.auth.authorize();
  }

  /**
   *
   * @returns Access token for authenticated user.
   */
  getAccessToken() {
    return this.auth.getAccessToken();
  }
}
