import { Idparser } from './lib/idparser';

export class IngenicoLibraryWS extends Idparser{
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