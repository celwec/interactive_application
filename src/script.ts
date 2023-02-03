///<reference path="core/entity.ts" />
///<reference path="core/component.ts" />
///<reference path="core/system.ts" />
///<reference path="core/units.ts" />
///<reference path="core/utils.ts" />
///<reference path="core/primitives.ts" />
///<reference path="core/shaders.ts" />
///<reference path="core/colors.ts" />

///<reference path="component/player.ts" />
///<reference path="component/transform.ts" />
///<reference path="component/solid.ts" />
///<reference path="component/renderable.ts" />
///<reference path="component/message.ts" />
///<reference path="component/scrollable.ts" />
///<reference path="component/triggerable.ts" />

///<reference path="system/movement.ts" />
///<reference path="system/physics.ts" />
///<reference path="system/scrolling.ts" />
///<reference path="system/trigger.ts" />

///<reference path="core/app.ts" />

///<reference path="game/player.ts" />
///<reference path="game/statics.ts" />
///<reference path="game/clouds.ts" />
///<reference path="game/stars.ts" />
///<reference path="game/messages.ts" />
///<reference path="game/triggers.ts" />

const entities: EntityArray = new EntityArray();
const systems: SystemArray = new SystemArray();

const player: Entity = createPlayer(0, 0);

entities.push(player);

entities.push(createGround(-2000, -1000, 1000, 1000));
entities.push(createGround(-2000, 0, 4000, 1000));
entities.push(createGround(2000, -100, 1000, 1000));
entities.push(createGround(3200, -100, 3000, 1000));
entities.push(createGround(6700, -100, 3000, 1000));

for (let i = 0; i < 50; i++) {
	entities.push(createCloud(-2000, 9700, -500, -300));
}

for (let i = 0; i < 300; i++) {
	entities.push(createStar(-2000, 9700, -800, 0));
}

entities.push(createMessage("Welcome to the interactive application!\n\nTo walk left and right\nuse the arrow keys left and right,\nor use the A and D keys.", 0, -400, "center"));
entities.push(createMessage("Use the space bar to jump.", 2000, -400, "center"));
entities.push(createMessage("Hold the shift key to run.", 3100, -400, "center"));

entities.push(createTrigger({
	x: 3000,
	y: 300,
	w: 200,
	h: 200,
	action: (self: Entity, activator: Entity, entities: EntityArray) => {
		const triggerable: Triggerable = self.get(Triggerable.name);

		if (triggerable.counter === 0) {
			const transform: Transform = activator.get(Transform.name);

			transform.position.x = 2900;
			transform.position.y = -132;

			const message: Entity = createMessage("Test", transform.position.x, transform.position.y - 100, "center");
			entities.push(message);
			triggerable.relatedEntities.push(message);
		}

		else if (triggerable.counter === 1) {
			const entity: Entity = triggerable.relatedEntities.all([Message])[0];
			const message: Message = entity.get(Message.name);
			const messageTransform: Transform = entity.get(Transform.name);
			const transform: Transform = activator.get(Transform.name);

			transform.position.x = 2900;
			transform.position.y = -132;
			message.content = "You can do it!";
			messageTransform.scale.x = message.width;
			messageTransform.scale.y = message.height;
		}
		
		else {
			const t: Transform = entities.all([Player])[0].get(Transform.name);
			t.position.x = 2900;
			t.position.y = -132;
		}
	},
}));

systems.push(new Movement());
systems.push(new Physics());
systems.push(new Scrolling());
systems.push(new Trigger());

const app: App = new App({
	entities: entities,
	systems: systems,
});