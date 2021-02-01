import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  ShopApp =  { App: 'Shop online', Ver: '1.0', API_URL: 'http://localhost:4200' };
}

export const csInstanse = new ConstantsService();
