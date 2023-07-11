import { CanActivateFn } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";

export const adminGuard: CanActivateFn = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(map((user) => {
    if (user.roles.includes("Admin") || user.roles.includes("Moderator")) {
      return true;
    }
    toastr.error("U can't enter this area");
    return false
  }));
};
