///<reference path="core/entity.ts" />
///<reference path="core/component.ts" />
///<reference path="core/archetype.ts" />
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
///<reference path="game/skillup.ts" />
///<reference path="game/book.ts" />

const entities: EntityArray = new EntityArray();
const systems: SystemArray = new SystemArray();

// const entity: Entity = new Entity();
// const transform: Transform = new Transform();
// const player: Player = new Player();
// const solid: Solid = new Solid();
// entity.set(Transform.name, transform);
// entity.set(Player.name, player);
// entity.set(Solid.name, solid);
// entities.push(entity);

// const player: Entity = createPlayer(4440, -144);
// const player: Entity = createPlayer(6144, -144);
const player: Entity = createPlayer(0, -144);

entities.push(player);

entities.push(createGround(-2000, -1000, 1360, 1000));
entities.push(createGround(-2000, 0, 3280, 1000));
entities.push(createGround(1280, -100, 2560, 1000));
// Training gap here
entities.push(createGround(3740, 100, 700, 1000));
entities.push(createGround(4340, -100, 1920, 1000));
// Bridge gap here
entities.push(createGround(6760, -100, 13240, 1000));
// Reversed
entities.push(createGround(8000, -2000, 6000, 1000));
entities.push(createGround(10600, -1000, 100, 100));
entities.push(createGround(10800, -1000, 100, 250));
// End Wall
entities.push(createGround(16000, -1000, 1280, 900));

entities.push(createBuilding(entities, -216, -600, 200, 600));
entities.push(createBuilding(entities, 15000, -700, 200, 600));

for (let i = 0; i < 50; i++) {
	entities.push(createCloud(-2000, 16500, -800, -300));
}

for (let i = 0; i < 300; i++) {
	entities.push(createStar(-2000, 16500, -1200, 0));
}

entities.push(
	createMessage({
		content:
			"Welcome to the interactive application!_In this short game you play as me, the little code wizard. You will have to guide the little code wizard through his journey to his new colleagues._Please pay special attention to the message boxes throughout the game._To walk left and right use the arrow keys left and right, or use the A and D keys respectively.",
		x: 0,
		y: -500,
		alignment: "center",
		backgroundColor: colorMessageFill,
		borderColor: colorMessageStroke,
		autobreak: 48,
	})
);
entities.push(
	createMessage({
		content: "Use the space bar to jump.",
		x: 1280,
		y: -400,
		alignment: "center",
		backgroundColor: colorMessageFill,
		borderColor: colorMessageStroke,
		autobreak: 48,
	})
);
entities.push(
	createMessage({
		content: "Hold the shift key to run.",
		x: 2560,
		y: -400,
		alignment: "center",
		backgroundColor: colorMessageFill,
		borderColor: colorMessageStroke,
		autobreak: 48,
	})
);

entities.push(
	createTrigger({
		x: 3500,
		y: -1000,
		w: 200,
		h: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const skillUpFill: Entity = createSkillUp({
					amount: 1,
					x: 3500,
					y: -300,
					backgroundColor: colorSkillFill,
				});

				const skillUpEmpty: Entity = createAntiSkillUp({
					amount: 5,
					x: 3500,
					y: -300,
					backgroundColor: colorMessageFill,
				});

				const message: Entity = createSkillMessage({
					content:
						"Soft Skill: Communication!_The little code wizard successfully communicated the game's controls to you.",
					x: 3500,
					y: -456,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorSkillFill,
				});

				entities.push(skillUpFill);
				entities.push(skillUpEmpty);
				entities.push(message);
			}
		},
	})
);

entities.push(
	createTrigger({
		x: 3840,
		y: -150,
		w: 500,
		h: 250,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const message: Entity = createMessage({
					content:
						"Looks like that gap was too far for the little code wizard._Fortunately his potential new colleagues are supportive even when he makes a mistake, so he is not afraid of making one._Encourage the little code wizard to try again by jumping out!",
					x: 4090,
					y: -400,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorMessageStroke,
					autobreak: 48,
				});

				entities.push(message);
				triggerable.relatedEntities.push(message);
			} else if (triggerable.counter === 1) {
				const message: Entity = triggerable.relatedEntities[0];
				const renderable: Renderable = message.get(Renderable.name);
				renderable.isRendered = true;
			}
		},
		actionOnLeave: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);
			const message: Entity = triggerable.relatedEntities[0];
			const renderable: Renderable = message.get(Renderable.name);

			if (!renderable) {
				return;
			}

			renderable.isRendered = false;
			triggerable.counter = 1;
		},
	})
);

entities.push(
	createTrigger({
		x: 4600,
		y: -1000,
		w: 200,
		h: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const skillUpFill: Entity = createSkillUp({
					amount: 2,
					x: 4600,
					y: -300,
					backgroundColor: colorSkillFill,
				});

				const skillUpEmpty: Entity = createAntiSkillUp({
					amount: 5,
					x: 4600,
					y: -300,
					backgroundColor: colorMessageFill,
				});

				const message: Entity = createSkillMessage({
					content:
						"Soft Skill: Courage!_The little code wizard showed his courage by not giving up even after failure.",
					x: 4600,
					y: -456,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorSkillFill,
				});

				entities.push(skillUpFill);
				entities.push(skillUpEmpty);
				entities.push(message);
			}
		},
	})
);

entities.push(
	createTrigger({
		x: 6060,
		y: -1000,
		w: 360,
		h: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				entities.push(
					createMessage({
						content:
							"This time the little code wizard is on his own without the help from his senior code wizards._He studied extra hard since the last time he made this mistake and has since learned how to deal with this problem._Let the little code wizard display his magic by pressing either Enter or E.",
						x: 5950,
						y: -500,
						alignment: "center",
						backgroundColor: colorMessageFill,
						borderColor: colorMessageStroke,
						autobreak: 32,
					})
				);

				entities.push(
					createTrigger({
						x: 6060,
						y: -1000,
						w: 360,
						h: 1000,
						isButtonEnabled: true,
						action: (self: Entity, activator: Entity, entities: EntityArray) => {
							const triggerable: Triggerable = self.get(Triggerable.name);

							if (triggerable.counter === 0) {
								entities.push(createGround(6240, -100, 540, 64));
								entities.push(
									createMessage({
										content:
											"const bridge: Bridge = new Bridge()\n    .length(500)\n    .width(64)\n    .build();",
										alignment: "left",
										x: 6250,
										y: -400,
										backgroundColor: colorMessageFill,
										borderColor: colorCodeStroke,
										autobreak: 0,
									})
								);
							}
						},
					})
				);
			}
		},
	})
);

entities.push(
	createTrigger({
		x: 6260,
		y: 100,
		w: 500,
		h: 200,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const transform: Transform = activator.get(Transform.name);

			transform.position.x = 6060;
			transform.position.y = -144;
		},
	})
);

entities.push(
	createTrigger({
		x: 7000,
		y: -1000,
		w: 100,
		h: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const skillUpFill: Entity = createSkillUp({
					amount: 3,
					x: 7000,
					y: -300,
					backgroundColor: colorSkillFill,
				});

				const skillUpEmpty: Entity = createAntiSkillUp({
					amount: 5,
					x: 7000,
					y: -300,
					backgroundColor: colorMessageFill,
				});

				const message: Entity = createSkillMessage({
					content:
						"Soft Skill: Inquisitiveness!_Through his natural curiousity and his eagerness to learn, the little code wizard was able to bridge the gap.",
					x: 7000,
					y: -476,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorSkillFill,
				});

				entities.push(skillUpFill);
				entities.push(skillUpEmpty);
				entities.push(message);
			}
		},
	})
);

entities.push(
	createTrigger({
		x: 9000,
		y: -450,
		w: 400,
		h: 450,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const solid: Solid = activator.get(Solid.name);
			const player: Player = activator.get(Player.name);

			solid.gravity.linear.y = -2;
			player.isGravityReversed = true;
		},
	})
);

entities.push(
	createTrigger({
		x: 11500,
		y: -1000,
		w: 500,
		h: 350,
		timeout: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const solid: Solid = activator.get(Solid.name);
			const player: Player = activator.get(Player.name);

			solid.gravity.linear.y = 2;
			player.isGravityReversed = false;
		},
	})
);

entities.push(
	createTrigger({
		x: 13000,
		y: -400,
		w: 500,
		h: 350,
		timeout: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const skillUpFill: Entity = createSkillUp({
					amount: 4,
					x: 13000,
					y: -300,
					backgroundColor: colorSkillFill,
				});

				const skillUpEmpty: Entity = createAntiSkillUp({
					amount: 5,
					x: 13000,
					y: -300,
					backgroundColor: colorMessageFill,
				});

				const message: Entity = createSkillMessage({
					content:
						"Soft Skill: Adaptability!_Even though the code wizard was surprised by the sudden change he was able to adapt himself to the new challenge and proceeds onwards.",
					x: 13000,
					y: -496,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorSkillFill,
				});

				entities.push(skillUpFill);
				entities.push(skillUpEmpty);
				entities.push(message);
			}
		},
	})
);

entities.push(
	createTrigger({
		x: 15100,
		y: -400,
		w: 500,
		h: 350,
		timeout: 1000,
		action: (self: Entity, activator: Entity, entities: EntityArray) => {
			const triggerable: Triggerable = self.get(Triggerable.name);

			if (triggerable.counter === 0) {
				const skillUpFill: Entity = createSkillUp({
					amount: 5,
					x: 15100,
					y: -300,
					backgroundColor: colorSkillFill,
				});

				const message: Entity = createSkillMessage({
					content:
						"Soft Skill: Teamwork!_Looks like the little code wizard has finished his journey to meet his new colleagues. Thank you for working together with the little code wizard to find the starting line for his new journey.",
					x: 15100,
					y: -556,
					alignment: "center",
					backgroundColor: colorMessageFill,
					borderColor: colorSkillFill,
				});

				entities.push(skillUpFill);
				entities.push(message);
			}
		},
	})
);

systems.push(new Movement());
systems.push(new Physics());
systems.push(new Scrolling());
systems.push(new Trigger());

const app: App = new App({
	entities: entities,
	systems: systems,
	width: 1280,
	height: 720,
});
