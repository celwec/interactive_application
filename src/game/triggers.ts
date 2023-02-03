function createTrigger(settings: {
	x: number,
	y: number,
	w: number,
	h: number,
	action: Function,
}): Entity {
	const rect: Rectangle = new Rectangle(settings.w, settings.h);
	const poly: Polygon = new Polygon([
		rect.topRight,
		rect.bottomRight,
		rect.bottomLeft,
		rect.topLeft,
	]);
	
	const entity: Entity = new Entity();
	const triggerable: Triggerable = new Triggerable({
		action: settings.action,
		isEnabled: true,
		position: new Vector(settings.x, settings.y),
		collider: poly,
		counter: 0,
	});

	entity.set(Triggerable.name, triggerable);
	return entity;
}