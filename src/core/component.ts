class Component {}

class ComponentMap extends Map {
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
