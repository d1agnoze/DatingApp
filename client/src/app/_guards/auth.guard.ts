import { CanActivateFn } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { ToastrService } from "ngx-toastr";
import { map, of } from "rxjs";
import { inject } from "@angular/core";
// @Injectable({
//   providedIn: 'root'
// })
export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  return accountService.currentUser$.pipe(map((user) => {
    if (user) return true;
    toastr.error("You Shall Not Pass");
    return false;
  }));
};
