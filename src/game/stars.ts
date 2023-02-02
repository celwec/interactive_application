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
	
	const renderable: Renderable = new Renderable({
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

function createStarMap(amount: number, minX: number, maxX: number, minY: number, maxY: number) {
	const entity: Entity = new Entity();
	const transform: Transform = new Transform({
		position: new Vector(-500, -500),
	});
	const solid: Solid = new Solid({
		isCollisionEnabled: false,
		isFrictionEnabled: false,
		isGravityEnabled: false,
		isVelocityEnabled: true,
		isStatic: false,
		velocity: new Force({
			linear: new Vector(-0.2, 0),
		}),
	});

	const buffer: OffscreenCanvas = new OffscreenCanvas(maxX, maxY);
	const context: WebGL2RenderingContext = <WebGL2RenderingContext>buffer.getContext("webgl2");

	initWebGL2(context);

	context.clear(context.COLOR_BUFFER_BIT);
	context.useProgram(this._program);
	context.enableVertexAttribArray(this._positionAttributeLocation);
	context.enableVertexAttribArray(this._texcoordAttributeLocation);
	context.bindBuffer(context.ARRAY_BUFFER, this._positionBuffer);

	const size: number = 2;
	const type: number = context.FLOAT;
	const normalize: boolean = false;
	const stride: number = 0;
	const offset: number = 0;
	
	context.vertexAttribPointer(this._positionAttributeLocation, size, type, normalize, stride, offset);
	context.vertexAttribPointer(this._texcoordAttributeLocation, size, type, normalize, stride, offset);


	for (let i = 0; i < amount; i++) {
		const entity: Entity = createStar(minX, maxX, minY, maxY);
		const transform: Transform = entity.get(Transform.name);
		const renderable: Renderable | Message = entity.get(Renderable.name) || entity.get(Message.name);
	
		const shape: Polygon = renderable.shape;
		const dx: number = transform.position.x;
		const dy: number = transform.position.y;
	
		let matrix: Float32Array = transform.matrix;
		matrix = Matrix.project(matrix, this._canvasWidth, this._canvasHeight);
		matrix = Matrix.translate(matrix, this._canvasWidth / 2 + dx, this._canvasHeight * 68/100 + dy);
		matrix = Matrix.scale(matrix, transform.scale.x, transform.scale.y);
	
		context.bufferData(context.ARRAY_BUFFER, new Float32Array(shape.vertices), context.STATIC_DRAW);
		context.uniformMatrix3fv(this._matrixUniformLocation, false, matrix);
		
		if (renderable instanceof Renderable) {
			if (!renderable.backgroundColor) {
				return;
			}
			
			context.uniform4f(this._colorUniformLocation, renderable.backgroundColor[0], renderable.backgroundColor[1], renderable.backgroundColor[2], renderable.backgroundColor[3]);
			context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, 1, 1, 0, context.RGBA, context.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
		} else {
			context.uniform4f(this._colorUniformLocation, 1, 1, 1, 1);
			context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, renderable.width, renderable.height, 0, context.RGBA, context.UNSIGNED_BYTE, renderable.texture);
		}
		
		const primitiveType: number = context.TRIANGLES;
		const count: number = renderable.shape.vertices.length / 2;
	
		context.drawArrays(primitiveType, offset, count);
	}

	return entity;
}