class Triggerable {
	public action: Function;
	public collider: Polygon;
	public counter: number;
	public isEnabled: boolean;
	public position: Vector;
	public relatedEntities: EntityArray;

	constructor(settings?: {
		action?: Function,
		collider?: Polygon,
		counter?: number,
		isEnabled?: boolean,
		position?: Vector,
	}) {
		this.action = settings?.action || new Function();
		this.collider = settings?.collider || new Polygon();
		this.counter = settings?.counter || 0;
		this.isEnabled = settings?.isEnabled || false; 
		this.position = settings?.position || Vector.zero;
		this.relatedEntities = new EntityArray();
	}

	public call(self: Entity, activator: Entity, entities: EntityArray) {
		if (!this.isEnabled) {
			return;
		}

		this.action(self, activator, entities);
		this.counter++;
	}
}