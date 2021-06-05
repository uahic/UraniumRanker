import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Role } from 'akita-ng-fire';
import { AuthQuery } from '../state/auth.query';

@UntilDestroy()
@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input("hasRole")
  checkRole!: Role;

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private authQuery: AuthQuery
  ) { }

  ngOnInit(): void {
    this.authQuery.hasRole(this.checkRole)
      .pipe(untilDestroyed(this))
      .subscribe(hasRole => {
        this.vcr.clear();
        if (hasRole) this.vcr.createEmbeddedView(this.tpl);
      });
  }

}
