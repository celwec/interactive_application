class Transform {
	public position: Vector;
	public rotation: Vector;
	public scale: Vector;

	public lastPosition: Vector;
	public lastRotation: Vector;
	public lastScale: Vector;

	constructor(settings?: { position?: Vector; rotation?: Vector; scale?: Vector }) {
		this.position = settings?.position || new Vector();
		this.rotation = settings?.rotation || new Vector();
		this.scale = settings?.scale || new Vector(1, 1);

		this.lastPosition = this.position;
		this.lastRotation = this.rotation;
		this.lastScale = this.scale;
	}

	public get matrix(): Float32Array {
		const tx: number = this.position.x;
		const ty: number = this.position.y;
		const rc: number = this.rotation.x;
		const rs: number = this.rotation.y;
		const sx: number = this.scale.x;
		const sy: number = this.scale.y;

		return new Float32Array([rc * sx, -rs, 0, rs, rc * sy, 0, tx, ty, 1]);
	}

	public set matrix(m: Float32Array) {
		this.position.x = m[6];
		this.position.y = m[7];

		this.scale.x = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
		this.scale.y = Math.sqrt(m[3] * m[3] + m[4] * m[4]);

		this.rotation.x = m[0] / this.scale.x;
		this.rotation.y = m[3] / this.scale.y;
	}
}
