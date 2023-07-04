import { CanDeactivateFn } from "@angular/router";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";

export const preventUnsavedChangesGuard: CanDeactivateFn<unknown> = (component: MemberEditComponent) => {
  if (component.editForm.dirty){
    return confirm('Are you sure? Unsaved will be lost')
  }
  return true;
};
