class Point {
	public x: number;
	public y: number;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	public add(other: Point | Vector | number): Point {
		if (other instanceof Vector || other instanceof Point) {
			return new Point(this.x + other.x, this.y + other.y);
		} else {
			return new Point(this.x + other, this.y + other);
		}
	}

	public subtract(other: Point | Vector | number): Point {
		if (other instanceof Vector || other instanceof Point) {
			return new Point(this.x - other.x, this.y - other.y);
		} else {
			return new Point(this.x - other, this.y - other);
		}
	}

	public multiply(other: Point | Vector | number): Point {
		if (other instanceof Vector || other instanceof Point) {
			return new Point(this.x * other.x, this.y * other.y);
		} else {
			return new Point(this.x * other, this.y * other);
		}
	}

	public divide(other: Point | Vector | number): Point {
		if (other instanceof Vector || other instanceof Point) {
			return new Point(this.x / other.x, this.y / other.y);
		} else {
			return new Point(this.x / other, this.y / other);
		}
	}

	public toVector(): Vector {
		return new Vector(this.x, this.y);
	}
}

class Segment {
	public start: Point;
	public end: Point;

	constructor(x0?: number, y0?: number, x1?: number, y1?: number) {
		this.start = new Point(x0, y0);
		this.end = new Point(x1, y1);
	}

	public add(other: Vector): Segment {
		return new Segment(this.start.x + other.x, this.start.y + other.y, this.end.x + other.x, this.end.y + other.y);
	}

	public toPoint(): Point {
		return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
	}

	public toVector(): Vector {
		return new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
	}
}

class Rectangle {
	public size: Vector;

	constructor(w?: number, h?: number) {
		this.size = new Vector();
		this.size.x = w || 1;
		this.size.y = h || 1;
	}

	public get topLeft(): Point {
		return new Point(0, 0);
	}

	public get topRight(): Point {
		return new Point(this.size.x, 0);
	}

	public get bottomRight(): Point {
		return new Point(0, this.size.y);
	}

	public get bottomLeft(): Point {
		return new Point(this.size.x, this.size.y);
	}
}

class Ellipse {
	public size: Vector;

	constructor(rx?: number, ry?: number) {
		this.size.x = rx || 1;
		this.size.y = ry || 1;
	}
}

class Polygon {
	public vertices: number[];
	public points: Point[];
	public edges: Segment[];
	public normals: Vector[];

	constructor(points?: Point[]) {
		this.points = points || [];
		this.vertices = [];
		this.edges = [];
		this.normals = [];

		for (let i = 0; i < this.points.length; i++) {
			const p0: Point = this.points[i];
			const p1: Point = this.points[(i + 1) % this.points.length];
			const edge: Segment = new Segment(p0.x, p0.y, p1.x, p1.y);
			const normal: Vector = edge.toVector().normalize().normal;

			this.edges.push(edge);
			this.normals.push(normal);
		}

		this.vertices = this._tri();
		// this.vertices = this._triangulate();
	}

	private _tri(): number[] {
		let triangles: Point[][] = [];

		for (let i = 0; i < this.points.length; i++) {
			const current: Point = this.points[i];
			const next: Point = this.points[(i + 1) % this.points.length];
			const center: Point = this._center();

			triangles.push([current, next, center]);
		}

		const flattened: Point[] = [].concat.apply([], triangles);
		let vertices: number[] = [];

		for (let i = 0; i < flattened.length; i++) {
			const p: Point = flattened[i];
			vertices.push(p.x);
			vertices.push(p.y);
		}

		return vertices;
	}

	private _center(): Point {
		let maxX: number = -Infinity;
		let maxY: number = -Infinity;
		let minX: number = Infinity;
		let minY: number = Infinity;

		for (let i = 0; i < this.points.length; i++) {
			const p: Point = this.points[i];

			maxX = Math.max(maxX, p.x);
			maxY = Math.max(maxY, p.y);
			minX = Math.min(minX, p.x);
			minY = Math.min(minY, p.y);
		}

		const ax: number = (maxX + minX) / 2;
		const ay: number = (maxY + minY) / 2;

		return new Point(ax, ay);
	}

	private _triangulate(): number[] {
		let points: Point[] = this.points.slice();
		let triangles: Point[][] = [];
		let n: number = this.points.length;

		while (n > 3) {
			for (let i = 0; i < n; i++) {
				const previous: Point = points[(i + n - 1) % n];
				const p: Point = points[i];
				const next: Point = points[(i + 1) % n];

				triangles.push([previous, p, next]);
				points.splice(i, 1);
				n--;
			}
		}

		triangles.push(points);
		const flattened: Point[] = [].concat.apply([], triangles);
		let vertices: number[] = [];

		for (let i = 0; i < flattened.length; i++) {
			const p: Point = flattened[i];
			vertices.push(p.x);
			vertices.push(p.y);
		}

		return vertices;
	}
}
