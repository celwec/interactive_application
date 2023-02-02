const vertexShaderCode: string = `
	attribute vec2 a_position;
	attribute vec2 a_texcoord;

	uniform mat3 u_matrix;

	varying vec2 v_texcoord;

	void main() {
		gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
		v_texcoord = a_texcoord;
	}
`;

const fragmentShaderCode: string = `
	precision mediump float;

	uniform vec4 u_color;
	uniform sampler2D u_texture;

	varying vec2 v_texcoord;

	void main() {
		gl_FragColor = u_color * texture2D(u_texture, v_texcoord);
		// gl_FragColor = u_color;
	}
`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | undefined {
	const shader: WebGLShader | null = gl.createShader(type);

	if (!shader) {
		return;
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success: boolean = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (!success) {
		console.error(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return;
	}

	return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
	const program: WebGLProgram | null = gl.createProgram();

	if (!program) {
		console.error(`Could not create program on ${gl}`);
		return null;
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	const success: boolean = gl.getProgramParameter(program, gl.LINK_STATUS);

	if (!success) {
		console.error(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	
	return program;
}