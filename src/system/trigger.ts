class Trigger implements System {
	update(entities: EntityArray): void {
		const playerEntity: Entity = entities.all([Player])[0];
		const playerTransform: Transform = playerEntity.get(Transform.name);
		const playerSolid: Solid = playerEntity.get(Solid.name);
		const filtered: EntityArray = entities.all([Triggerable]);

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			const triggerable: Triggerable = entity.get(Triggerable.name);

			if (!triggerable.isEnabled) {
				continue;
			}

			const collision: boolean = Physics.SAT(playerSolid, playerTransform, triggerable);

			if (collision) {
				triggerable.call(entity, playerEntity, entities);
			}
		}
	}
}