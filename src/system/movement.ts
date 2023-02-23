class Movement implements System {
	update(entities: EntityArray): void {
		const filtered: EntityArray = entities.all([Transform, Solid]);

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			const solid: Solid = entity.get(Solid.name);

			if (!solid.isVelocityEnabled) {
				continue;
			}

			const transform: Transform = entity.get(Transform.name);

			if (!transform || !solid) {
				return;
			}

			transform.lastPosition = transform.position;
			transform.position = transform.position.add(solid.velocity.linear);
		}
	}
}

// class Movement implements System {
// 	update(entities: EntityArray): void {
// 		const filtered: EntityArray = entities.all([Transform, Solid]);

// 		for (let i = 0; i < filtered.length; i++) {
// 			const entity: Entity = filtered[i];
// 			const solid: Solid = entity.get(Solid.name);

// 			if (!solid.isVelocityEnabled) {
// 				continue;
// 			}

// 			const transform: Transform = entity.get(Transform.name);

// 			if (!transform || !solid) {
// 				return;
// 			}

// 			transform.lastPosition = transform.position;
// 			transform.position = transform.position.add(solid.velocity.linear);
// 		}
// 	}
// }
