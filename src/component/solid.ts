class Solid {
	public collider: Polygon;

	public friction: Force;
	public gravity: Force;
	public velocity: Force;

	public isCollisionEnabled: boolean;
	public isGravityEnabled: boolean;
	public isStatic: boolean;

	constructor(settings?: {
		collider?: Polygon,
		friction?: Force,
		gravity?: Force,
		velocity?: Force,
		isCollisionEnabled?: boolean,
		isGravityEnabled?: boolean,
		isStatic?: boolean
	}) {
		this.collider = settings?.collider || new Polygon();

		this.friction = settings?.friction || new Force();
		this.gravity = settings?.gravity || new Force();
		this.velocity = settings?.velocity || new Force();
		
		this.isCollisionEnabled = settings?.isCollisionEnabled || false;
		this.isGravityEnabled = settings?.isGravityEnabled || false;
		this.isStatic = settings?.isStatic || false;
	}
}