class Scrollable {
	public minX: number;
	public minY: number;
	public maxX: number;
	public maxY: number;

	constructor(minX?: number, maxX?: number, minY?: number, maxY?: number) {
		this.minX = minX || -1000;
		this.maxX = maxX || 1000;
		this.minY = minY || -1000;
		this.maxY = maxY || 1000;
	}
}