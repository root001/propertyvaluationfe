import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IPostObject<U>{
  url: string;
  data: U;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private _http: HttpClient) {}

  /**
   * postAPI
   * @param postRequest : Object with url and Post Data
   * @returns 
   */
  postAPI(postRequest: any) {
    return this._http.post(postRequest.url, postRequest.data, {
      observe: 'response'
    });
  }

  /**
   * getApi
   * @param getRequest 
   * @returns 
   */
  getApi(getRequest: any) {
    if (getRequest.params) {
      return this._http.get(getRequest.url, {
        observe: 'response',
        params: getRequest.params
      });
    }
    return this._http.get(getRequest.url, {
      observe: 'response'
    });
  }

}
