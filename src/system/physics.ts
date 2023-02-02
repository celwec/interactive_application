class Physics implements System {
	update(): void {
		const filtered: EntityArray = entities.all([Solid]);

		if (filtered.length < 1) {
			return;
		}

		for (let i = 0; i < filtered.length; i++) {
			const a: Entity = filtered[i];
			const sa: Solid = a.get(Solid.name);

			this.processFriction(sa);
			this.processGravity(sa);

			if (!sa.isCollisionEnabled) {
				continue;
			}
			
			for (let j = i+1; j < filtered.length; j++) {
				const ta: Transform = a.get(Transform.name);

				if (!ta) {
					break;
				}
				
				const b: Entity = filtered[j];
				const sb: Solid = b.get(Solid.name);

				if (!sb || !sb.isCollisionEnabled) {
					continue;
				}

				const tb: Transform = b.get(Transform.name);

				if (!tb) {
					continue;
				}

				this.processCollision(sa, sb, ta, tb);
			}
		}
	}

	private processGravity(solid: Solid): void {
		if (!solid.isGravityEnabled) {
			return;
		}
		
		solid.velocity.linear = solid.velocity.linear.add(solid.gravity.linear);
	}
	
	private processFriction(solid: Solid): void {
		if (!solid.isFrictionEnabled) {
			return;
		}

		solid.velocity.linear = solid.velocity.linear.multiply(Vector.one.subtract(solid.friction.linear));
		solid.velocity.rotational = solid.velocity.rotational.multiply(solid.friction.rotational);
		solid.velocity.scalar = solid.velocity.scalar.multiply(solid.friction.scalar);

		if (Math.abs(solid.velocity.linear.x) < 0.01) {
			solid.velocity.linear.x = 0;
		}

		if (Math.abs(solid.velocity.linear.y) < 0.01) {
			solid.velocity.linear.y = 0;
		}
	}

	private processCollision(sa: Solid, sb: Solid, ta: Transform, tb: Transform): void {
		const collision: boolean = this._staticSAT(sa, sb, ta, tb);
	}

	private _staticSAT(sa: Solid, sb: Solid, ta: Transform, tb: Transform): boolean {
		let smallestOverlap: number = Infinity;
		let axis: Vector = new Vector();

		for (let i = 0; i < sa.collider.normals.length; i++) {
			const normal: Vector = sa.collider.normals[i];

			let maxA: number = -Infinity;
			let maxB: number = -Infinity;
			let minA: number = Infinity;
			let minB: number = Infinity;
			
			for (let j = 0; j < sa.collider.points.length; j++) {
				const vertex: Point = sa.collider.points[j].add(ta.position);
				const dot: number = vertex.toVector().dot(normal);

				maxA = Math.max(maxA, dot);
				minA = Math.min(minA, dot);
			}

			for (let j = 0; j < sb.collider.points.length; j++) {
				const vertex: Point = sb.collider.points[j].add(tb.position);
				const dot: number = vertex.toVector().dot(normal);

				maxB = Math.max(maxB, dot);
				minB = Math.min(minB, dot);
			}

			if (maxA < minB || maxB < minA) {
				return false;
			}

			const overlap: number = Math.min(maxA, maxB) - Math.max(minA, minB);

			if (overlap < smallestOverlap) {
				smallestOverlap = overlap;
				axis = normal;
			}
		}
		
		for (let i = 0; i < sb.collider.normals.length; i++) {
			const normal: Vector = sa.collider.normals[i];

			let maxA: number = -Infinity;
			let maxB: number = -Infinity;
			let minA: number = Infinity;
			let minB: number = Infinity;
			
			for (let j = 0; j < sa.collider.points.length; j++) {
				const vertex: Point = sa.collider.points[j].add(ta.position);
				const dot: number = vertex.toVector().dot(normal);

				maxA = Math.max(maxA, dot);
				minA = Math.min(minA, dot);
			}

			for (let j = 0; j < sb.collider.points.length; j++) {
				const vertex: Point = sb.collider.points[j].add(tb.position);
				const dot: number = vertex.toVector().dot(normal);

				maxB = Math.max(maxB, dot);
				minB = Math.min(minB, dot);
			}

			if (maxA < minB || maxB < minA) {
				return false;
			}

			const overlap: number = Math.min(maxA, maxB) - Math.max(minA, minB);

			if (overlap < smallestOverlap) {
				smallestOverlap = overlap;
				axis = normal;
			}
		}

		if(tb.position.subtract(ta.position).dot(axis) > 0) {
			axis = axis.multiply(-1);
		}

		const resolution: Vector = axis.multiply(smallestOverlap);

		if (!sa.isStatic) {
			ta.position = ta.position.add(resolution);
		}

		if (!sb.isStatic) {
			tb.position = tb.position.add(resolution);
		}

		return false;
	}
}