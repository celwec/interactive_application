class Entity extends Map {
	public all(componentTypes: Array<new () => Component>): ComponentMap | undefined {
		let foundComponents = new ComponentMap();

		for (let i = 0; i < componentTypes.length; i++) {
			const componentType = componentTypes[i];
			const foundComponent = this.get(componentType.name);

			if (foundComponent) {
				foundComponents.set(foundComponent.constructor.name, foundComponent);
			}
		}

		if (foundComponents.size === componentTypes.length) {
			return foundComponents;
		} else {
			return undefined;
		}
	}

	public any(componentTypes: Array<new () => Component>): ComponentMap | undefined {
		let hasMatchingComponents = false;

		for (let i = 0; i < componentTypes.length; i++) {
			const component = componentTypes[i];

			if (this.has(component.name)) {
				hasMatchingComponents = true;
			}
		}

		if (hasMatchingComponents) {
			return this;
		} else {
			return undefined;
		}
	}
}

class EntityArray extends Array {
	constructor(entities?: Entity[]) {
		super();

		if (!entities) {
			return;
		}

		this.push(entities);
	}

	public all(components: Array<new () => Component>): EntityArray {
		let filtered: EntityArray = new EntityArray();

		for (let i = 0; i < this.length; i++) {
			const entity: Entity = this[i];

			if (entity.all(components)) {
				filtered.push(entity);
			}
		}

		return filtered;
	}

	public any(components: Array<new () => Component>): EntityArray {
		let filtered: EntityArray = new EntityArray();

		for (let i = 0; i < this.length; i++) {
			const entity = this[i];

			if (entity.any(components)) {
				filtered.push(entity);
			}
		}

		return filtered;
	}
}
