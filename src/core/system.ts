interface System {
	// update(entities: EntityArray): void;
	update(archetypes: ArchetypeMap): void;
}

class SystemArray extends Array {
	public add<T extends System>(system: new () => T): this {
		this.push(typeof system);
		return this;
	}
}
