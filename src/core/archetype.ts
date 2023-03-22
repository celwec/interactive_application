class ArchetypeMap extends Map<string, Entity[]> {
	public add(entity: Entity) {
		const archetypes: string[] = this._getArchetypesFrom(entity);

		for (let i = 0; i < archetypes.length; i++) {
			const archetype = archetypes[i];
			const hash: string = this._hashStr(archetype);
			const hasArchetype: boolean = this.has(hash);

			if (hasArchetype) {
				const entities: Entity[] = this.get(hash)!;

				if (entities.includes(entity)) {
					continue;
				}

				entities.push(entity);
			} else {
				this.set(hash, [entity]);
			}
		}
	}

	public pull(components: string[]): Entity[] {
		const hash: string = this._hash(components);

		if (!this.has(hash)) {
			return new EntityArray();
		}

		const entities: Entity[] = this.get(hash)!;

		return entities;
	}

	private _hash(strings: string[]): string {
		const hash: string = strings.join("").toLowerCase().split("").sort().join("");
		return hash;
	}

	private _hashStr(string: string): string {
		const hash: string = string.toLowerCase().split("").sort().join("");
		return hash;
	}

	private _getArchetypesFrom(entity: Entity): string[] {
		const components: string[] = Array.from(entity.values()).map((v) => v.constructor.name);
		return this._getPermutations(components).slice(1);
	}

	private _getPermutations(components: string[]): string[] {
		const permutations: string[] = [];

		function generatePermutations(currentString: string, remainingComponents: string[]): void {
			permutations.push(currentString);

			for (let i = 0; i < remainingComponents.length; i++) {
				generatePermutations(
					currentString + remainingComponents[i],
					remainingComponents.slice(0, i).concat(remainingComponents.slice(i + 1))
				);
			}
		}

		generatePermutations("", components);

		return permutations;
	}
}
