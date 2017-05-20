import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
  endpoint = 'https://angular-http-9a5f9.firebaseio.com/';

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type':'application/json'});
    // return this.http.post(this.endpoint, servers,
    // { headers: headers });
    return this.http.put(this.endpoint + 'data.json', servers,
    { headers: headers });
  }

  getServers() {
    return this.http.get(this.endpoint + 'data.json').map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    )
    .catch(
      (error: Response) => {
          return Observable.throw('Something went Wrong!');
      }
    );
  }

  getAppName() {
    return this.http.get(this.endpoint + 'appName.json').map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}
