class ArchetypeMap extends Map<string, Entity[]> {
	public add(entity: Entity): void {
		const components: string[] = Array.from(entity.keys());
		const permutations: string[] = this._windows(components);

		for (let i = 0; i < permutations.length; i++) {
			const permutation: string = permutations[i];
			const hash: string = this._hashStr(permutation);

			if (!this.has(hash)) {
				this.set(hash, [entity]);
				return;
			}

			const entities: Entity[] = this.get(hash)!;
			entities.push(entity);
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

	private _permutations(strings: string[]): string[] {
		const permutations: string[] = [];

		for (let i = 0; i < strings.length; i++) {
			for (let j = i; j < strings.length; j++) {
				const slice: string[] = strings.slice(i, j + 1);
				const variations: string[] = this._variations(slice);

				for (let k = 0; k < variations.length; k++) {
					const variation: string = variations[k];
					permutations.push(variation);
				}
			}
		}

		return permutations;
	}

	private _variations(strings: string[]): string[] {
		let variations: string[] = [];

		for (let i = 0; i < strings.length; i++) {
			variations = variations.concat(strings.join(""));
			const shifted: string = strings.shift()!;
			strings.push(shifted);
		}

		return variations;
	}

	private _windows(strings: string[]): string[] {
		const permutations: string[] = [];

		for (let size = 1; size < strings.length; size++) {
			for (let index = 0; index < strings.length; index++) {
				const window: string[] = strings.slice(index, (index + size) % strings.length);
				const variations: string[] = this._variations(window);

				for (let k = 0; k < variations.length; k++) {
					const variation: string = variations[k];
					permutations.push(variation);
				}
			}
		}

		return permutations;
	}
}
