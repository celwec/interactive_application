function createBuilding(entities: EntityArray, x: number, y: number, w: number, h: number): Entity {
	const rectWindow: Rectangle = new Rectangle(1, 1);

	const polyWindow: Polygon = new Polygon([
		rectWindow.topLeft,
		rectWindow.topRight,
		rectWindow.bottomLeft,
		rectWindow.bottomRight,
	]);

	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 16; c++) {
			const skip: boolean = Math.round(Math.random()) % 2 == 0;

			if (skip) {
				continue;
			}

			const entity: Entity = new Entity();

			const bMargin: number = 24;
			const wMargin: number = 8;

			const sx: number = (w - bMargin - bMargin + wMargin) / 8 - wMargin;
			const sy: number = (h - bMargin * 2) / 20 - wMargin;
			const px: number = x + bMargin + (sx + wMargin) * r;
			const py: number = y + bMargin + (sy + wMargin) * c;

			const transform: Transform = new Transform({
				scale: new Vector(sx, sy),
				position: new Vector(px, py),
			});

			const renderable: Renderable = Renderable.polygon({
				// backgroundColor: [228 / 225, 157 / 255, 0, 0.5],
				backgroundColor: [0.9, 0.9, 1, 0.1],
				layer: 11,
				shape: polyWindow,
			});

			entity.set(Transform.name, transform);
			entity.set(Renderable.name, renderable);

			archetypes.add(entity);
		}
	}

	const rect: Rectangle = new Rectangle(w, h);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	const entity: Entity = new Entity();

	const transform: Transform = new Transform({
		position: new Vector(x, y),
	});

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: colorBuildingFill,
		layer: 10,
		shape: poly,
	});

	entity.set(Transform.name, transform);
	entity.set(Renderable.name, renderable);

	return entity;
}

function createGround(x: number, y: number, w: number, h: number): Entity {
	const rect: Rectangle = new Rectangle(w, h);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	const entity: Entity = new Entity();
	const transform: Transform = new Transform({
		position: new Vector(x, y),
	});
	const solid: Solid = new Solid({
		collider: poly,
		isCollisionEnabled: true,
		isStatic: true,
		isGravityEnabled: false,
		isFrictionEnabled: false,
		isVelocityEnabled: false,
	});

	const renderable: Renderable = Renderable.polygon({
		backgroundColor: colorGroundFill,
		layer: 20,
		shape: poly,
	});

	// const renderable: Renderable = new Renderable({
	// 	layer: 20,
	// 	shape: poly,
	// 	backgroundColor: colorGroundFill,
	// });

	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Renderable.name, renderable);

	return entity;
}
