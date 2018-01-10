import { Ingenicohas } from './has/ingenicohas';

export class IngenicoLibraryWS extends Ingenicohas{
	parentComponent: any;
	constructor(){
		this.parentComponent = null;
	}
	setParentComponent(t: any){
		this.parentComponent = t;
	}
	getParentComponent(){
		return this.parentComponent;
	}
	testFunc(){
		console.log('testing');
	}
	/*-------------------------------------------------------------------------------*/
	
}

