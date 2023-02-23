function createTrigger(config: {
	x: number;
	y: number;
	w: number;
	h: number;
	action: Function;
	actionOnLeave?: Function;
	timeout?: number;
	isButtonEnabled?: boolean;
}): Entity {
	const rect: Rectangle = new Rectangle(config.w, config.h);
	const poly: Polygon = new Polygon([rect.topRight, rect.bottomRight, rect.bottomLeft, rect.topLeft]);

	const entity: Entity = new Entity();
	const triggerable: Triggerable = new Triggerable({
		action: config.action,
		actionOnLeave: config.actionOnLeave,
		collider: poly,
		counter: 0,
		isEnabled: true,
		position: new Vector(config.x, config.y),
		timeout: config.timeout || 0,
		isButtonEnabled: config.isButtonEnabled || false,
	});

	entity.set(Triggerable.name, triggerable);
	return entity;
}
