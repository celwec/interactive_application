class Movement implements System {
	update(entities: EntityArray): void {
		const filtered: EntityArray = entities.all([Transform, Solid]);

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			
			const transform: Transform = entity.get(Transform.name);
			const solid: Solid = entity.get(Solid.name);

			if (!transform || !solid) {
				return;
			}

			transform.lastPosition = transform.position;
			transform.position = transform.position.add(solid.velocity.linear);
		}
	}
}
