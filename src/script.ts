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
///<reference path="component/colorable.ts" />

///<reference path="system/movement.ts" />
///<reference path="system/physics.ts" />

///<reference path="core/app.ts" />

///<reference path="game/player.ts" />
///<reference path="game/statics.ts" />
///<reference path="game/clouds.ts" />
///<reference path="game/stars.ts" />

const entities: EntityArray = new EntityArray();
const systems: SystemArray = new SystemArray();

entities.push(createPlayer(0, 0));

entities.push(createGround(-2000, -1000, 1000, 1000));
entities.push(createGround(-2000, 0, 4000, 1000));
entities.push(createGround(2000, -100, 1000, 1000));
entities.push(createGround(3200, -100, 3000, 1000));
entities.push(createGround(6700, -100, 3000, 1000));

for (let i = 0; i < 50; i++) {
	entities.push(createCloud(-2000, 9700, -500, -300));	
}

for (let i = 0; i < 300; i++) {
	entities.push(createStar(-2000, 9700, -700, 0));
}

systems.push(new Movement());
systems.push(new Physics());

const app: App = new App(entities, systems);