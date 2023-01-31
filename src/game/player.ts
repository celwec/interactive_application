function createPlayer(x: number, y: number): Entity {
	const rect: Rectangle = new Rectangle(32, 32);
	const poly: Polygon = new Polygon([
		rect.topLeft,
		rect.topRight,
		rect.bottomLeft,
		rect.bottomRight,
	]);

	const entity: Entity = new Entity();
	const player: Player = new Player();
	const transform: Transform = new Transform({
		position: new Vector(x, y),
	});
	const solid: Solid = new Solid({
		collider: poly,
		gravity: new Force({
			linear: new Vector(0, 2),
		}),
		friction: new Force({
			linear: new Vector(0.2, 0.2),
		}),
		isCollisionEnabled: true,
		isGravityEnabled: true,
		isStatic: false,
	});
	const colorable: Colorable = new Colorable({
		layer: 100,
		shape: poly,
		backgroundColor: colorGroundFill,
	});

	entity.set(Player.name, player);
	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Colorable.name, colorable);

	return entity;
}