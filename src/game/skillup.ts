function createAntiSkillUp(config: { amount: number; backgroundColor?: number[]; x: number; y: number }) {
	const poly: Polygon = new Polygon([
		new Point(16, 0),
		new Point(20.797931, 10.745535),
		new Point(32, 12.222913),
		new Point(23.763215, 20.341395),
		new Point(25.888542, 32),
		new Point(16, 26.271964),
		new Point(6.1114555, 32),
		new Point(8.2367859, 20.341395),
		new Point(0, 12.222912),
		new Point(11.202069, 10.745535),
	]);

	const entity: Entity = new Entity();

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: config.backgroundColor,
		layer: 97,
		shape: poly,
	});

	const transform: Transform = new Transform({
		position: new Vector(config.x - 32, config.y),
		scale: new Vector(2, 2),
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

function createSkillUp(config: {
	amount: number;
	backgroundColor?: number[];
	borderColor?: number[];
	x: number;
	y: number;
}) {
	let poly: Polygon = new Polygon();

	if (config.amount === 5) {
		poly = new Polygon([
			new Point(16, 0),
			new Point(20.797931, 10.745535),
			new Point(32, 12.222913),
			new Point(23.763215, 20.341395),
			new Point(25.888542, 32),
			new Point(16, 26.271964),
			new Point(6.1114555, 31.999999),
			new Point(8.2367859, 20.341395),
			new Point(0, 12.222912),
			new Point(11.202069, 10.745535),
		]);
	} else if (config.amount === 4) {
		poly = new Polygon([
			new Point(11.202069, 10.745535),
			new Point(16, 0),
			new Point(20.797931, 10.745535),
			new Point(32, 12.222913),
			new Point(23.763215, 20.341395),
			new Point(25.888542, 32),
			new Point(16, 26.271964),
			new Point(6.1114555, 31.999999),
			new Point(8.2367859, 20.341395),
			new Point(16, 18),
		]);
	} else if (config.amount === 3) {
		poly = new Polygon([
			new Point(11.202069, 10.745535),
			new Point(16, 0),
			new Point(20.797931, 10.745535),
			new Point(32, 12.222913),
			new Point(23.763215, 20.341395),
			new Point(25.888542, 32),
			new Point(16, 26.271964),
			new Point(16, 18),
		]);
	} else if (config.amount === 2) {
		poly = new Polygon([
			new Point(11.202069, 10.745535),
			new Point(16, 0),
			new Point(20.797931, 10.745535),
			new Point(32, 12.222913),
			new Point(23.763215, 20.341395),
			new Point(16, 18),
		]);
	} else if (config.amount === 1) {
		poly = new Polygon([
			new Point(11.202069, 10.745535),
			new Point(16, 0),
			new Point(20.797931, 10.745535),
			new Point(16, 18),
		]);
	}

	const entity: Entity = new Entity();

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: config.backgroundColor,
		borderColor: config.borderColor,
		borderWidth: 1,
		layer: 98,
		shape: poly,
	});

	const transform: Transform = new Transform({
		position: new Vector(config.x - 32, config.y),
		scale: new Vector(2, 2),
	});

	const solid: Solid = new Solid({
		isCollisionEnabled: false,
		isFrictionEnabled: true,
		isGravityEnabled: false,
		isVelocityEnabled: true,
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
