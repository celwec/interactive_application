class Triggerable {
	public action: Function;
	public actionOnLeave: Function;
	public collider: Polygon;
	public counter: number;
	public isButtonEnabled: boolean;
	public isColliding: boolean;
	public isEnabled: boolean;
	public isSolid: boolean;
	public lastTriggered: number;
	public position: Vector;
	public relatedEntities: EntityArray;
	public timeout: number;

	constructor(config?: {
		action?: Function;
		actionOnLeave?: Function;
		collider?: Polygon;
		counter?: number;
		isColliding?: boolean;
		isEnabled?: boolean;
		isSolid?: boolean;
		position?: Vector;
		timeout?: number;
		isButtonEnabled?: boolean;
	}) {
		this.action = config?.action || new Function();
		this.actionOnLeave = config?.actionOnLeave || new Function();
		this.collider = config?.collider || new Polygon();
		this.counter = config?.counter || 0;
		this.isEnabled = config?.isEnabled || false;
		this.position = config?.position || Vector.zero;
		this.relatedEntities = new EntityArray();
		this.isColliding = config?.isColliding || false;
		this.isSolid = config?.isSolid || false;
		this.timeout = config?.timeout || 0;
		this.isButtonEnabled = config?.isButtonEnabled || false;
	}

	public call(self: Entity, activator: Entity, entities: EntityArray) {
		const dt: number = performance.now() - this.lastTriggered;

		if (!this.isEnabled || dt < this.timeout) {
			return;
		}

		this.action(self, activator, entities);
		this.counter++;
		this.lastTriggered = performance.now();
	}

	public callOnLeave(self: Entity, activator: Entity, entities: EntityArray) {
		if (!this.isEnabled) {
			return;
		}

		this.actionOnLeave(self, activator, entities);
	}
}
