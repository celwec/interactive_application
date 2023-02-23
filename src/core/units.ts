abstract class Matrix {
	static multiply(a: Float32Array, b: Float32Array): Float32Array {
		const a00: number = a[0 * 3 + 0];
		const a01: number = a[0 * 3 + 1];
		const a02: number = a[0 * 3 + 2];
		const a10: number = a[1 * 3 + 0];
		const a11: number = a[1 * 3 + 1];
		const a12: number = a[1 * 3 + 2];
		const a20: number = a[2 * 3 + 0];
		const a21: number = a[2 * 3 + 1];
		const a22: number = a[2 * 3 + 2];
		const b00: number = b[0 * 3 + 0];
		const b01: number = b[0 * 3 + 1];
		const b02: number = b[0 * 3 + 2];
		const b10: number = b[1 * 3 + 0];
		const b11: number = b[1 * 3 + 1];
		const b12: number = b[1 * 3 + 2];
		const b20: number = b[2 * 3 + 0];
		const b21: number = b[2 * 3 + 1];
		const b22: number = b[2 * 3 + 2];

		return new Float32Array([
			b00 * a00 + b01 * a10 + b02 * a20,
			b00 * a01 + b01 * a11 + b02 * a21,
			b00 * a02 + b01 * a12 + b02 * a22,
			b10 * a00 + b11 * a10 + b12 * a20,
			b10 * a01 + b11 * a11 + b12 * a21,
			b10 * a02 + b11 * a12 + b12 * a22,
			b20 * a00 + b21 * a10 + b22 * a20,
			b20 * a01 + b21 * a11 + b22 * a21,
			b20 * a02 + b21 * a12 + b22 * a22,
		]);
	}

	static project(w: number, h: number): Float32Array {
		return new Float32Array([2 / w, 0, 0, 0, -2 / h, 0, -1, 1, 1]);
	}

	static translate(m: Float32Array, x: number, y: number): Float32Array {
		return Matrix.multiply(m, Matrix.translation(x, y));
	}

	static scale(m: Float32Array, x: number, y: number): Float32Array {
		return Matrix.multiply(m, Matrix.scaling(x, y));
	}

	private static identity(): Float32Array {
		return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
	}

	private static translation(x: number, y: number): Float32Array {
		return new Float32Array([1, 0, 0, 0, 1, 0, x, y, 1]);
	}

	private static scaling(x: number, y: number): Float32Array {
		return new Float32Array([x, 0, 0, 0, y, 0, 0, 0, 1]);
	}
}

class Vector {
	public x: number;
	public y: number;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	static get zero(): Vector {
		return new Vector(0, 0);
	}

	static get one(): Vector {
		return new Vector(1, 1);
	}

	static fromRadians(other: number): Vector {
		const x: number = Math.cos(other);
		const y: number = Math.sin(other);
		return new Vector(x, y);
	}

	static fromDegrees(other: number): Vector {
		const x = Math.cos(other * (Math.PI / 180));
		const y = Math.sin(other * (Math.PI / 180));
		return new Vector(x, y);
	}

	public get normal(): Vector {
		return new Vector(this.y, -this.x);
	}

	public get radians(): number {
		return Math.atan2(this.y, this.x);
	}

	public set radians(other: number) {
		this.x = Math.cos(other);
		this.y = Math.sin(other);
	}

	public get degrees(): number {
		return this.radians * (180 / Math.PI);
	}

	public set degrees(other: number) {
		this.x = Math.cos(other * (Math.PI / 180));
		this.y = Math.sin(other * (Math.PI / 180));
	}

	public add(other: Vector | Point | number): Vector {
		if (other instanceof Vector || other instanceof Point) {
			return new Vector(this.x + other.x, this.y + other.y);
		} else {
			return new Vector(this.x + other, this.y + other);
		}
	}

	public subtract(other: Vector | Point | number): Vector {
		if (other instanceof Vector || other instanceof Point) {
			return new Vector(this.x - other.x, this.y - other.y);
		} else {
			return new Vector(this.x - other, this.y - other);
		}
	}

	public multiply(other: Vector | Point | number): Vector {
		if (other instanceof Vector || other instanceof Point) {
			return new Vector(this.x * other.x, this.y * other.y);
		} else {
			return new Vector(this.x * other, this.y * other);
		}
	}

	public divide(other: Vector | Point | number): Vector {
		if (other instanceof Vector || other instanceof Point) {
			return new Vector(this.x / other.x, this.y / other.y);
		} else {
			return new Vector(this.x / other, this.y / other);
		}
	}

	public dot(other: Vector): number {
		return this.x * other.x + this.y * other.y;
	}

	public normalize(): Vector {
		const length: number = Math.sqrt(this.x * this.x + this.y * this.y);
		return new Vector(this.x / length, this.y / length);
	}

	public toPoint(): Point {
		return new Point(this.x, this.y);
	}
}

class Force {
	public linear: Vector;
	public rotational: Vector;
	public scalar: Vector;

	constructor(settings?: { linear?: Vector; rotational?: Vector; scalar?: Vector }) {
		this.linear = settings?.linear || new Vector();
		this.rotational = settings?.rotational || new Vector();
		this.scalar = settings?.scalar || new Vector(1, 1);
	}
}

class Frame {
	public delayMs: number;
	public height: number;
	public texture: TexImageSource;
	public width: number;
	public xOffset: number;
	public yOffset: number;

	constructor(url: string, xOffset: number, yOffset: number, width: number, height: number, delayMs: number) {
		this.delayMs = delayMs;
		this.height = height;
		this.width = width;
		this.xOffset = xOffset;
		this.yOffset = yOffset;

		const off: OffscreenCanvas = new OffscreenCanvas(width, height);
		const ctx: OffscreenCanvasRenderingContext2D = <OffscreenCanvasRenderingContext2D>off.getContext("2d");

		const image: HTMLImageElement = new Image();
		image.src = url;
		const sx: number = xOffset;
		const sy: number = yOffset;
		const sw: number = width;
		const sh: number = height;
		const dx: number = 0;
		const dy: number = 0;
		const dw: number = width;
		const dh: number = height;

		ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
		this.texture = off.transferToImageBitmap();
	}
}
