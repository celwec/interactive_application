function createMessage(content: string, x: number, y: number, alignment: "left" | "center" | "right"): Entity {
	const rect: Rectangle = new Rectangle(1, 1);
	const poly: Polygon = new Polygon([
		rect.topLeft,
		rect.topRight,
		rect.bottomLeft,
		rect.bottomRight,
	]);
	
	const entity: Entity = new Entity();
	const message: Message = new Message({
		alignment: alignment,
		animated: true,
		backgroundColor: "#110d28",
		borderColor: "#ea0064",
		borderWidth: 4,
		content: content,
		fontFamily: "monospace",
		fontSize: 20,
		padding: 16,
		shape: poly,
		fontColor: "#f0f0f0",
		layer: 60,
	});

	const width: number = message.alignment === "left" ? 0 : message.alignment === "center" ? message.width / 2 : message.width;
	const transform: Transform = new Transform({
		position: new Vector(x-width, y),
		scale: new Vector(message.width, message.height),
	});
	
	entity.set(Transform.name, transform);
	entity.set(Message.name, message);

	return entity;
}