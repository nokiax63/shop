import { Component, Inject, OnInit, Optional } from '@angular/core';
import { GeneratorService } from '../core/services/generator.service';
import { StringGenerator, generatorFactory } from '../core/services/generator.factory';
import { localStorageInstance, LocalStorageService } from '../core/services/local-storage.service';
import { ConfigOptionService } from '../core/services/config-option.service';
import { ConfigModel } from '../core/models/config-model';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
  providers: [
      GeneratorService,
      { provide: StringGenerator, useFactory: generatorFactory(10), deps: [GeneratorService] },
      { provide: LocalStorageService, useValue: localStorageInstance }
  ]
})
export class FirstComponent implements OnInit {

  constructor(
    @Optional() private configOptionsService: ConfigOptionService,
    @Inject(StringGenerator) private stringGenerator: any[],
    @Optional() private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
      this.configOptionsService.setConfig(new ConfigModel(1, 'login', 'password'));
      console.log(this.configOptionsService.getConfig());
      console.log(`Random string with 10 elements: ${this.stringGenerator}`);
      this.localStorageService.setItem('name', 'Easy shop');
      console.log(`ShopName - ${this.localStorageService.getItem('name')}`);
    }

}
