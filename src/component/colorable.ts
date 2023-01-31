class Colorable {
	public layer: number;
	public shape: Polygon;
	public backgroundColor: number[] | undefined;
	public borderColor: number[] | undefined;
	public borderWidth: number;

	constructor(settings?: {
		layer?: number,
		shape?: Polygon,
		backgroundColor?: number[],
		borderColor?: number[],
		borderWidth?: number,
	}) {
		this.layer = settings?.layer || 0;
		this.shape = settings?.shape || new Polygon();
		this.backgroundColor = settings?.backgroundColor;
		this.borderColor = settings?.borderColor;
		this.borderWidth = settings?.borderWidth || 0;
	}
}