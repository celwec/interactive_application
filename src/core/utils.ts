function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

function clamp(val: number, min: number, max: number): number {
	return Math.min(Math.max(val, min), max);
}

function initWebGL2(context: WebGL2RenderingContext) {
	const vertexShader = createShader(context, context.VERTEX_SHADER, vertexShaderCode);
	const fragmentShader = createShader(context, context.FRAGMENT_SHADER, fragmentShaderCode);

	if (!vertexShader || !fragmentShader) {
		console.error("Could not create shaders");
		return;
	}

	this._program = createProgram(context, vertexShader, fragmentShader);

	if (!this._program) {
		console.error("Could not create program");
		return;
	}

	this._positionAttributeLocation = context.getAttribLocation(this._program, "a_position");
	this._texcoordAttributeLocation = context.getAttribLocation(this._program, "a_texcoord");
	this._matrixUniformLocation = context.getUniformLocation(this._program, "u_matrix");
	this._colorUniformLocation = context.getUniformLocation(this._program, "u_color");
	
	if (!this._matrixUniformLocation || !this._colorUniformLocation) {
		console.error("Could not get uniform location");
		return;
	}
	
	this._positionBuffer = context.createBuffer();

	if (!this._positionBuffer) {
		console.error("Could not create position buffer");
		return;
	}

	context.bindBuffer(context.ARRAY_BUFFER, this._positionBuffer);
	context.viewport(0, 0, this._canvasWidth, this._canvasHeight);
	context.clearColor(28/255, 22/255, 58/255, 1);

	const texture = context.createTexture();
	context.bindTexture(context.TEXTURE_2D, texture);
	context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, 1, 1, 0, context.RGBA, context.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
}