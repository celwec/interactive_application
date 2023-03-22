class Trigger implements System {
	update(archetypes: ArchetypeMap): void {
		const playerEntity: Entity = archetypes.pull([Player.name])![0];
		const player: Player = playerEntity.get(Player.name);
		const playerTransform: Transform = playerEntity.get(Transform.name);
		const playerSolid: Solid = playerEntity.get(Solid.name);
		const filtered: Entity[] = archetypes.pull([Triggerable.name])!;

		for (let i = 0; i < filtered.length; i++) {
			const entity: Entity = filtered[i];
			const triggerable: Triggerable = entity.get(Triggerable.name);

			if (!triggerable.isEnabled) {
				continue;
			}

			if (!triggerable.isButtonEnabled || (triggerable.isButtonEnabled && player.isCasting)) {
				const collision: boolean = Physics.SAT(playerSolid, playerTransform, triggerable);

				if (collision) {
					triggerable.isColliding = true;
					triggerable.call(entity, playerEntity, entities);
				} else if (triggerable.isColliding === true) {
					triggerable.isColliding = false;
					triggerable.callOnLeave(entity, playerEntity, entities);
				}
			}
		}
	}
}
