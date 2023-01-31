function createGround(x: number, y: number, w: number, h: number): Entity {
	const rect: Rectangle = new Rectangle(w, h);
	const poly: Polygon = new Polygon([
		rect.topLeft,
		rect.topRight,
		rect.bottomLeft,
		rect.bottomRight,
	]);

	const entity: Entity = new Entity();	
	const transform: Transform = new Transform({
		position: new Vector(x, y),
	});
	const solid: Solid = new Solid({
		collider: poly,
		isCollisionEnabled: true,
		isStatic: true,
		isGravityEnabled: false,
	});

	const colorable: Colorable = new Colorable({
		layer: 20,
		shape: poly,
		backgroundColor: colorGroundFill,
	});

	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Colorable.name, colorable);

	return entity;
}