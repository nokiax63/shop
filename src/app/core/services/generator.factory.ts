import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const StringGenerator = new InjectionToken<number[]>('Generator');

export function generatorFactory(n: number): any {
    return (generatorService: GeneratorService) => generatorService.generate(n);
}
