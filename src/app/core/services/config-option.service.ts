import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionService {

  configModel!: ConfigModel;

  constructor() { }

  getConfig(): ConfigModel {
    return this.configModel;
  }

  setConfig(config: ConfigModel): void{
    this.configModel = config;
  }
}
