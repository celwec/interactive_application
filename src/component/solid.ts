class Solid {
	public collider: Polygon;

	public friction: Force;
	public gravity: Force;
	public velocity: Force;

	public isCollisionEnabled: boolean;
	public isFrictionEnabled: boolean;
	public isGravityEnabled: boolean;
	public isVelocityEnabled: boolean;
	public isStatic: boolean;

	constructor(settings?: {
		collider?: Polygon,
		isStatic?: boolean,
		isCollisionEnabled?: boolean,

		friction?: Force,
		gravity?: Force,
		velocity?: Force,
		
		isFrictionEnabled?: boolean,
		isGravityEnabled?: boolean,
		isVelocityEnabled?: boolean,
	}) {
		this.collider = settings?.collider || new Polygon();
		this.isStatic = settings?.isStatic || false;
		this.isCollisionEnabled = settings?.isCollisionEnabled || false;

		this.friction = settings?.friction || new Force();
		this.gravity = settings?.gravity || new Force();
		this.velocity = settings?.velocity || new Force();
		
		this.isFrictionEnabled = settings?.isFrictionEnabled || false;
		this.isGravityEnabled = settings?.isGravityEnabled || false;
		this.isVelocityEnabled = settings?.isVelocityEnabled || false;
	}
}