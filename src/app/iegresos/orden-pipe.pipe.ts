import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
	name: 'ordenPipe'
})
export class OrdenPipePipe implements PipeTransform {

	transform(items: IngresoEgreso[]): IngresoEgreso[] {
		return items.sort((a, b) => {
			if (a.tipo == 'ingreso') {
				return -1;
			} else {
				return 1;
			}
		})
	}

}
