import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "../_models/user";
import { ReplaySubject } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }
}
