class App {
	private _entities: EntityArray;
	private _systems: SystemArray;

	private _keyStates: Object;
	
	private _currentTime: number;
	private _lastTime: number;
	private _elapsedTime: number;
	private _updateBehindTime: number;
	private _renderBehindTime: number;
	private _msPerUpdate: number;
	private _msPerRender: number;

	private _canvas: HTMLCanvasElement | null;
	private _canvasWidth: number;
	private _canvasHeight: number;
	private _gl: WebGL2RenderingContext | null;
	private _program: WebGLProgram | null;
	private _positionAttributeLocation: number;
	private _texcoordAttributeLocation: number;
	private _matrixUniformLocation: WebGLUniformLocation | null;
	private _colorUniformLocation: WebGLUniformLocation | null;
	private _positionBuffer: WebGLBuffer | null;

	constructor(settings: {
		entities: EntityArray,
		systems: SystemArray,
		width?: number,
		height?: number,
	}) {
		this._entities = settings.entities;
		this._systems = settings.systems;

		this._keyStates = Object;
		
		this._currentTime = 0;
		this._lastTime = 0;
		this._elapsedTime = 0;
		this._updateBehindTime = 0;
		this._renderBehindTime = 0;
		this._msPerUpdate = 1000/60;
		this._msPerRender = 1000/240;

		this._canvasWidth = settings.width || 1280;
		this._canvasHeight = settings.height || 720;
		
		this._loop = this._loop.bind(this);
		this._processInput = this._processInput.bind(this);
		this._keyboardEventHandler = this._keyboardEventHandler.bind(this);

		document.addEventListener("keydown", this._keyboardEventHandler);
		document.addEventListener("keyup", this._keyboardEventHandler);
		
		this._canvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
		
		if (!this._canvas) {
			console.error("Canvas not found");
			return;
		}
		
		this._canvas.width = this._canvasWidth;
		this._canvas.height = this._canvasHeight;
		this._gl = this._canvas.getContext("webgl2") as WebGL2RenderingContext | null;
		
		if (!this._gl) {
			console.error("This browser does not support webgl2");
			return;
		}
		
		// WebGL Start
		const vertexShader = createShader(this._gl, this._gl.VERTEX_SHADER, vertexShaderCode);
		const fragmentShader = createShader(this._gl, this._gl.FRAGMENT_SHADER, fragmentShaderCode);

		if (!vertexShader || !fragmentShader) {
			console.error("Could not create shaders");
			return;
		}

		this._program = createProgram(this._gl, vertexShader, fragmentShader);

		if (!this._program) {
			console.error("Could not create program");
			return;
		}

		this._positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
		this._texcoordAttributeLocation = this._gl.getAttribLocation(this._program, "a_texcoord");
		this._matrixUniformLocation = this._gl.getUniformLocation(this._program, "u_matrix");
		this._colorUniformLocation = this._gl.getUniformLocation(this._program, "u_color");
		
		if (!this._matrixUniformLocation || !this._colorUniformLocation) {
			console.error("Could not get uniform location");
			return;
		}
		
		this._positionBuffer = this._gl.createBuffer();

		if (!this._positionBuffer) {
			console.error("Could not create position buffer");
			return;
		}

		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
		this._gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
		this._gl.clearColor(28/255, 22/255, 58/255, 1);

		const texture = this._gl.createTexture();
		this._gl.bindTexture(this._gl.TEXTURE_2D, texture);
		this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
		this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
		this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
		this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
		// WebGL End

		requestAnimationFrame(this._loop);
	}

	private _loop(): void {
		this._currentTime = performance.now();
		this._elapsedTime = this._currentTime - this._lastTime;
		this._lastTime = this._currentTime;
		this._updateBehindTime += this._elapsedTime;
		this._renderBehindTime += this._elapsedTime;

		this._processInput();

		if (this._updateBehindTime >= this._msPerUpdate) {
			this._update();
			this._updateBehindTime -= this._msPerUpdate;
		}

		if (this._renderBehindTime >= this._msPerRender) {
			this._render();
			this._renderBehindTime -= this._msPerRender;
		}

		requestAnimationFrame(this._loop);
	}

	private _processInput(): void {
		const filtered: EntityArray = entities.all([Player, Transform, Solid]);

		if (filtered.length !== 1) {
			return;
		}

		const entity: Entity = filtered[0];
		const player: Player = entity.get(Player.name);
		const transform: Transform = entity.get(Transform.name);
		const solid: Solid = entity.get(Solid.name);
		
		if (!player || !transform || !solid) {
			return;
		}

		const speed: number = this._keyStates["shift"] ? player.runSpeed : player.walkSpeed;

		if (this._keyStates["a"] || this._keyStates["arrowleft"]) {
			solid.velocity.linear.x -= speed;
		}
			
		if (this._keyStates["d"] || this._keyStates["arrowright"]) {
			solid.velocity.linear.x += speed;
		}

		if (!player.isCasting && (this._keyStates["e"] || this._keyStates["enter"])) {
			player.isCasting = true;
		}

		if (!this._keyStates["e"] && !this._keyStates["enter"]) {
			player.isCasting = false;
		}

		if (this._keyStates[" "] && !player.isJumping && transform.lastPosition.y === transform.position.y) {
			player.jumpStartTime = performance.now();
			player.isJumping = true;
			player.jumpStartY = transform.position.y;
			player.jumpEndY = transform.position.y - player.jumpHeight;
		}

		if (!this._keyStates[" "]) {
			player.isJumping = false;
		}

		if (this._keyStates[" "] && player.isJumping && !player.jumpFinished) {
			if (transform.position.y > player.jumpEndY) {
				solid.velocity.linear.y = -player.jumpSpeed;
			}
		}
	}

	private _update(): void {
		for (let i = 0; i < this._systems.length; i++) {
			const system: System = this._systems[i];
			system.update(this._entities);
		}
	}

	private _render(): void {
		if (!this._gl) {
			return;
		}

		const player: Entity = this._entities.all([Player])[0];
		const playerTransform: Transform = player.get(Transform.name);

		if (!playerTransform) {
			return;
		}

		const filtered: EntityArray = this._entities.all([Transform]).any([Renderable, Message]).sort((a: Entity, b: Entity) => {
			const ac: Renderable | Message = a.get(Renderable.name) || a.get(Message.name);
			const bc: Renderable | Message = b.get(Renderable.name) || b.get(Message.name);

			return ac.layer - bc.layer;
		});

		if (filtered.length < 1) {
			return;
		}
		
		this._gl.clear(this._gl.COLOR_BUFFER_BIT);
		this._gl.useProgram(this._program);
		this._gl.enableVertexAttribArray(this._positionAttributeLocation);
		this._gl.enableVertexAttribArray(this._texcoordAttributeLocation);
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
		
		const size: number = 2;
		const type: number = this._gl.FLOAT;
		const normalize: boolean = false;
		const stride: number = 0;
		const offset: number = 0;
		
		this._gl.vertexAttribPointer(this._positionAttributeLocation, size, type, normalize, stride, offset);
		this._gl.vertexAttribPointer(this._texcoordAttributeLocation, size, type, normalize, stride, offset);

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			const transform: Transform = entity.get(Transform.name);
			const renderable: Renderable | Message = entity.get(Renderable.name) || entity.get(Message.name);

			const shape: Polygon = renderable.shape;
			const dx: number = transform.position.x - playerTransform.position.x;
			const dy: number = transform.position.y - playerTransform.position.y;

			let matrix: Float32Array = transform.matrix;
			matrix = Matrix.project(matrix, this._canvasWidth, this._canvasHeight);
			matrix = Matrix.translate(matrix, this._canvasWidth / 2 + dx, this._canvasHeight * 68/100 + dy);
			matrix = Matrix.scale(matrix, transform.scale.x, transform.scale.y);

			this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(shape.vertices), this._gl.STATIC_DRAW);
			this._gl.uniformMatrix3fv(this._matrixUniformLocation, false, matrix);
			
			if (renderable instanceof Renderable) {
				if (!renderable.backgroundColor) {
					continue;
				}
				
				this._gl.uniform4f(this._colorUniformLocation, renderable.backgroundColor[0], renderable.backgroundColor[1], renderable.backgroundColor[2], renderable.backgroundColor[3]);
				this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
			} else {
				this._gl.uniform4f(this._colorUniformLocation, 1, 1, 1, 1);
				this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, renderable.width, renderable.height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, renderable.texture);
			}
			
			const primitiveType: number = this._gl.TRIANGLES;
			const count: number = renderable.shape.vertices.length / 2;
	
			this._gl.drawArrays(primitiveType, offset, count);
		}
	}

	private _keyboardEventHandler(keyboardEvent: KeyboardEvent): void {
		const key: string = keyboardEvent.key.toLowerCase();

		if (keyboardEvent.type === "keydown" && !this._keyStates[key]) {
			this._keyStates[key] = true;
		} else if (keyboardEvent.type === "keyup" && this._keyStates[key]) {
			this._keyStates[key] = false;
		}

		this._keyStates["shift"] = keyboardEvent.shiftKey;

		if (keyboardEvent.key === " ") {
			keyboardEvent.preventDefault();
		}
	}
}