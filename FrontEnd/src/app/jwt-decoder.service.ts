import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  token = sessionStorage.getItem('a0.spajs.txs.Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ')
  constructor() { }
  printTokenInfo(): void {
    if (this.token) {
      console.log(JSON.parse(this.token));

    }
  }
}
