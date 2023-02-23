function createStar(minX: number, maxX: number, minY: number, maxY: number): Entity {
	const poly: Polygon = new Polygon([
		new Point(3.9687501, 7.9375),
		new Point(3.688117, 4.249383),
		new Point(0, 3.9687501),
		new Point(3.688117, 3.688117),
		new Point(3.9687499, 0),
		new Point(4.249383, 3.688117),
		new Point(7.9375, 3.9687499),
		new Point(4.249383, 4.249383),
	]);

	const x: number = Math.random() * (maxX - minX) + minX;
	const y: number = Math.random() * (maxY - minY) + minY;
	const s: number = Math.random() * (6 - 2) + 2;

	const entity: Entity = new Entity();

	const transform: Transform = new Transform({
		position: new Vector(x, y),
		scale: new Vector(s, s),
	});

	const solid: Solid = new Solid({
		collider: poly,
		isCollisionEnabled: false,
		isGravityEnabled: false,
		isStatic: true,
		velocity: new Force({
			linear: new Vector(0.1, 0),
		}),
		isFrictionEnabled: false,
		isVelocityEnabled: true,
	});

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: colorStarFill,
		layer: 0,
		shape: poly,
	});

	const scrollable: Scrollable = new Scrollable(minX, maxX, minY, maxY);

	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Renderable.name, renderable);
	entity.set(Scrollable.name, scrollable);

	return entity;
}
