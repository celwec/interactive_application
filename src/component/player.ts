class Player {
	public runSpeed: number;
	public walkSpeed: number;
	public isJumping: boolean;
	public jumpStartTime: number;
	public jumpDurationMs: number;
	public jumpSpeed: number;
	public jumpStartY: number;
	public jumpEndY: number;
	public jumpHeight: number;
	public isCasting: boolean;

	constructor() {
		this.walkSpeed = 1;
		this.runSpeed = 2;
		this.isJumping = false;
		this.jumpStartTime = 0;
		this.jumpDurationMs = 300;
		this.jumpSpeed = 15;
		this.jumpStartY = 0;
		this.jumpEndY = 0;
		this.jumpHeight = 200;
		this.isCasting = false;
	}

	public get jumpFinished(): boolean {
		return performance.now() - this.jumpStartTime > this.jumpDurationMs;
	}

	public get jumpElapsedTime(): number {
		return performance.now() - this.jumpStartTime;
	}
}