function createMessage(config: {
	content: string;
	x: number;
	y: number;
	alignment: "left" | "center" | "right";
	backgroundColor?: number[];
	borderColor?: number[];
	autobreak: number;
}): Entity {
	const rect: Rectangle = new Rectangle(1, 1);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	const entity: Entity = new Entity();

	const renderable: Renderable = Renderable.message({
		alignment: config.alignment,
		fillStyle: config.backgroundColor,
		borderColor: config.borderColor,
		borderWidth: 4,
		content: config.content,
		fontSize: 20,
		padding: 16,
		shape: poly,
		fontColor: "#f0f0f0",
		layer: 60,
		autobreak: config.autobreak,
	});

	const width: number =
		renderable.alignment === "left"
			? 0
			: renderable.alignment === "center"
			? renderable.width / 2
			: renderable.width;
	const transform: Transform = new Transform({
		position: new Vector(config.x - width, config.y),
		scale: new Vector(renderable.width, renderable.height),
	});

	entity.set(Renderable.name, renderable);
	entity.set(Transform.name, transform);

	return entity;
}

function createSkillMessage(config: {
	content: string;
	x: number;
	y: number;
	alignment: "left" | "center" | "right";
	backgroundColor?: number[];
	borderColor?: number[];
}): Entity {
	const rect: Rectangle = new Rectangle(1, 1);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	const entity: Entity = new Entity();

	const renderable: Renderable = Renderable.message({
		alignment: config.alignment,
		autobreak: 32,
		borderColor: config.borderColor,
		borderWidth: 4,
		content: config.content,
		fillStyle: config.backgroundColor,
		fontColor: "#f0f0f0",
		fontSize: 20,
		layer: 60,
		padding: 16,
		shape: poly,
	});

	const width: number =
		renderable.alignment === "left"
			? 0
			: renderable.alignment === "center"
			? renderable.width / 2
			: renderable.width;
	const transform: Transform = new Transform({
		position: new Vector(config.x - width, config.y),
		scale: new Vector(renderable.width, renderable.height),
	});

	const solid: Solid = new Solid({
		isCollisionEnabled: false,
		isFrictionEnabled: true,
		isGravityEnabled: false,
		isVelocityEnabled: true,
		isStatic: true,
		velocity: new Force({
			linear: new Vector(0, -1),
		}),
		friction: new Force({
			linear: new Vector(0, 0.05),
		}),
	});

	entity.set(Renderable.name, renderable);
	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);

	return entity;
}
