class Renderable {
	public backgroundColor: number[] | undefined;
	public borderColor: number[] | undefined;
	public borderWidth: number;
	public layer: number;
	public shape: Polygon;

	constructor(settings?: {
		backgroundColor?: number[],
		borderColor?: number[],
		borderWidth?: number,
		layer?: number,
		shape?: Polygon,
	}) {
		this.backgroundColor = settings?.backgroundColor;
		this.borderColor = settings?.borderColor;
		this.borderWidth = settings?.borderWidth || 0;
		this.layer = settings?.layer || 0;
		this.shape = settings?.shape || new Polygon();
	}
}