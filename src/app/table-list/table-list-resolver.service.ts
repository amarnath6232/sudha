import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { signUp } from 'app/Model/model';
import { Observable } from 'rxjs';
import { SampleService } from 'app/Services/sample.service';

@Injectable()
export class TableListResolverService implements Resolve<signUp[]> {

  constructor(private tablelist: SampleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<signUp[]> | Promise<signUp[]> | signUp[] {
    return this.tablelist.getUser();
  }
}
