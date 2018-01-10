import { Has } from './has/has';

export class IngenicoLibraryWS extends Has{
	parentComponent: any;
	constructor(){
		super();
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