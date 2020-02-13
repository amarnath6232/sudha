import { Injectable } from '@angular/core';
import { Minikit } from 'app/Model/model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SampleService } from 'app/Services/sample.service';

@Injectable()
export class ListMinikitResolverService implements Resolve<Minikit[]> {

  constructor(private sample: SampleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Minikit[]> | Promise<Minikit[]> | Minikit[] {
    return this.sample.getMinikit();
  }
}
