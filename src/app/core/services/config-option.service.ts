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

  setConfig(config: Partial<ConfigModel>): void {
    this.configModel = {...this.configModel, ...config};
  }
}
