function createBook(config: { x: number; y: number; w: number; h: number; timeout: number; action: Function }): Entity {
	const rect: Rectangle = new Rectangle(config.w, config.h);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	const entity: Entity = new Entity();

	const triggerable: Triggerable = new Triggerable({
		action: config.action,
		collider: poly,
		counter: 0,
		isEnabled: true,
		position: new Vector(config.x, config.y + 1),
		isSolid: true,
		timeout: config.timeout,
	});

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: colorSkillFill,
		layer: 110,
		shape: poly,
	});

	const solid: Solid = new Solid({
		isCollisionEnabled: true,
		isFrictionEnabled: false,
		isGravityEnabled: false,
		isStatic: true,
		isVelocityEnabled: false,
		collider: poly,
	});

	const transform: Transform = new Transform({
		position: new Vector(config.x, config.y),
	});

	entity.set(Triggerable.name, triggerable);
	entity.set(Renderable.name, renderable);
	entity.set(Solid.name, solid);
	entity.set(Transform.name, transform);

	return entity;
}
