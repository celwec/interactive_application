class App {
	private _systems: SystemArray;
	private _archetypes: ArchetypeMap;

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

	private _canvasRatioWidth: number;
	private _canvasRatioHeight: number;

	private _playerTransform: Transform;

	constructor(settings: { systems: SystemArray; archetypes: ArchetypeMap; width?: number; height?: number }) {
		this._systems = settings.systems;
		this._archetypes = settings.archetypes;

		this._keyStates = Object;

		this._currentTime = 0;
		this._lastTime = 0;
		this._elapsedTime = 0;
		this._updateBehindTime = 0;
		this._renderBehindTime = 0;
		this._msPerUpdate = 1000 / 60;
		this._msPerRender = 1000 / 240;

		this._canvasWidth = settings.width || 1280;
		this._canvasHeight = settings.height || 720;

		this._canvasRatioWidth = this._canvasWidth / 1280;
		this._canvasRatioHeight = this._canvasHeight / 720;

		const player: Entity = this._archetypes.pull([Player.name])[0];
		this._playerTransform = player.get(Transform.name);

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
		this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
		this._gl.enable(this._gl.BLEND);
		this._gl.clearColor(28 / 255, 22 / 255, 58 / 255, 1);

		const texture = this._gl.createTexture();
		this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

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
		const filtered: Entity[] = this._archetypes.pull([Player.name, Transform.name, Solid.name]);

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
			if (!player.isGravityReversed) {
				player.jumpEndY = transform.position.y - player.jumpHeight;
			} else {
				player.jumpEndY = transform.position.y + player.jumpHeight;
			}
		}

		if (!this._keyStates[" "]) {
			player.isJumping = false;
		}

		if (this._keyStates[" "] && player.isJumping && !player.jumpFinished) {
			if (!player.isGravityReversed && transform.position.y > player.jumpEndY) {
				solid.velocity.linear.y = -player.jumpSpeed;
			} else if (player.isGravityReversed && transform.position.y < player.jumpEndY) {
				solid.velocity.linear.y = player.jumpSpeed;
			}
		}
	}

	private _update(): void {
		for (let i = 0; i < this._systems.length; i++) {
			const system: System = this._systems[i];
			system.update(this._archetypes);
		}
	}

	private _render() {
		if (!this._gl) {
			return;
		}

		const filtered: Entity[] = this._archetypes
			.pull([Transform.name, Renderable.name])
			.sort((a: Entity, b: Entity) => {
				const ac: Renderable = a.get(Renderable.name);
				const bc: Renderable = b.get(Renderable.name);

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
			const renderable: Renderable = entity.get(Renderable.name);

			if (!renderable.isRendered) {
				continue;
			}

			const transform: Transform = entity.get(Transform.name);

			const shape: Polygon = renderable.shape;
			const dx: number = transform.position.x - this._playerTransform.position.x;
			const dy: number = transform.position.y - this._playerTransform.position.y;

			let matrix: Float32Array = transform.matrix;

			matrix = Matrix.project(this._canvasWidth, this._canvasHeight);

			matrix = Matrix.translate(
				matrix,
				this._canvasWidth / 2 + dx * this._canvasRatioWidth,
				(this._canvasHeight * 68) / 100 + dy * this._canvasRatioHeight
			);

			matrix = Matrix.scale(
				matrix,
				transform.scale.x * this._canvasRatioWidth,
				transform.scale.y * this._canvasRatioHeight
			);

			this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(shape.vertices), this._gl.STATIC_DRAW);
			this._gl.uniformMatrix3fv(this._matrixUniformLocation, false, matrix);
			this._gl.uniform4f(
				this._colorUniformLocation,
				renderable.backgroundColor[0],
				renderable.backgroundColor[1],
				renderable.backgroundColor[2],
				renderable.backgroundColor[3]
			);

			this._gl.texImage2D(
				this._gl.TEXTURE_2D,
				0,
				this._gl.RGBA,
				renderable.width,
				renderable.height,
				0,
				this._gl.RGBA,
				this._gl.UNSIGNED_BYTE,
				renderable.texture
			);

			if (renderable.type === "sprite") {
				renderable.nextFrame();
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
