class Scrollable {
	public minX: number;
	public minY: number;
	public maxX: number;
	public maxY: number;

	constructor(minX: number, maxX: number, minY: number, maxY: number) {
		this.minX = minX;
		this.maxX = maxX;
		this.minY = minY;
		this.maxY = maxY;
	}
}