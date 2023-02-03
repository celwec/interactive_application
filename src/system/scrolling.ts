class Scrolling implements System {
	update(entities: EntityArray): void {
		const filtered: EntityArray = entities.all([Transform, Scrollable]);

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			const transform: Transform = entity.get(Transform.name);
			const scrollable: Scrollable = entity.get(Scrollable.name);

			if (transform.position.x < scrollable.minX) {
				transform.position.x = scrollable.maxX;
			}
			
			else if (transform.position.x > scrollable.maxX) {
				transform.position.x = scrollable.minX;
			}

			if (transform.position.y < scrollable.minY) {
				transform.position.y = scrollable.maxY;
			}

			else if (transform.position.y > scrollable.maxY) {
				transform.position.y = scrollable.minY;
			}
		}
	}
}