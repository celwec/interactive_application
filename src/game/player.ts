function createPlayer(x: number, y: number): Entity {
	const rect: Rectangle = new Rectangle(1, 1);
	const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

	// const image: HTMLImageElement = new Image();
	// image.src = "assets/spritesheets/cat.jpg";
	// ImageBitmapRenderingContext;
	// const idle: Frame[] = [
	// 	new Frame("assets/spritesheets/player.png", 20, 2, 30, 44, 250),
	// 	// new Frame(image, 72, 48, 72, 48, 500),
	// 	// new Frame(72 * 2, 48, 72, 48, 100),
	// 	// new Frame(72 * 3, 0, 72, 48, 500),
	// ];
	// const animations: Map<string, Frame[]> = new Map<string, Frame[]>();
	// animations.set("idle", idle);

	const entity: Entity = new Entity();
	const player: Player = new Player();

	// const renderable: Renderable = Renderable.sprite({
	// 	animations: animations,
	// 	currentAnimation: "idle",
	// 	frameIndex: 0,
	// 	layer: 100,
	// 	shape: poly,
	// 	url: "assets/spritesheets/player.png",
	// });

	const transform: Transform = new Transform({
		position: new Vector(x, y),
		scale: new Vector(30, 44),
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
		isVelocityEnabled: true,
		isFrictionEnabled: true,
	});

	const renderable: Renderable = Renderable.polygon({
		layer: 100,
		shape: poly,
	});

	entity.set(Player.name, player);
	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Renderable.name, renderable);

	return entity;
}
