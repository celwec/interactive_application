class Message {
	public alignment: "left" | "center" | "right";
	public animated: boolean;
	public backgroundColor: string | undefined;
	public borderColor: string | undefined;
	public borderWidth: number;
	public content: string;
	public currentIndex: number;
	public fontFamily: string;
	public fontSize: number;
	public fontColor: string | undefined;
	public layer: number;
	public padding: number;
	public shape: Polygon;
	public texture: ImageBitmap;
	public width: number;
	public height: number;

	constructor(settings?: {
		alignment?: "left" | "center" | "right",
		animated?: boolean,
		backgroundColor?: string,
		borderColor?: string,
		borderWidth?: number,
		content?: string,
		currentIndex?: number,
		fontFamily?: string,
		fontSize?: number,
		layer?: number,
		padding?: number,
		shape?: Polygon,
		fontColor?: string,
	}) {
		this.alignment = settings?.alignment || "left";
		this.animated = settings?.animated || false;
		this.backgroundColor = settings?.backgroundColor;
		this.borderColor = settings?.borderColor;
		this.borderWidth = settings?.borderWidth || 0;
		this.content = settings?.content || "";
		this.currentIndex = settings?.currentIndex || 0;
		this.fontFamily = settings?.fontFamily || "monospace";
		this.fontSize = settings?.fontSize || 16;
		this.layer = settings?.layer || 50;
		this.padding = settings?.padding || 0;
		this.shape = settings?.shape || new Polygon();
		this.fontColor = settings?.fontColor || "#000000";

		const lines: string[] = this.content.split("\n");

		const fontWidth: number = this.fontSize * 3/5;
		const w: number = fontWidth * this.content.split("\n").reduce((maxLength: number, line: string) => Math.max(maxLength, line.length), 0) + this.padding * 2 + this.borderWidth * 2;
		const h: number = this.fontSize * this.content.split("\n").length + this.padding * 2 + this.borderWidth * 2;

		this.width = w;
		this.height = h;
		
		const buffer: OffscreenCanvas = new OffscreenCanvas(w, h);	
		const context: OffscreenCanvasRenderingContext2D = <OffscreenCanvasRenderingContext2D>buffer.getContext("2d");
		
		context.textBaseline = "top";
		context.textAlign = this.alignment;
		context.fillStyle = this.borderColor ? this.borderColor : "#000000";
		context.fillRect(0, 0, w, h);
		context.fillStyle = this.backgroundColor ? this.backgroundColor : "#000000";
		context.fillRect(this.borderWidth, this.borderWidth, w - this.borderWidth * 2, h - this.borderWidth * 2);
		context.font = `${this.fontSize}px ${this.fontFamily}`;
		context.fillStyle = this.fontColor;
		
		const offset: number = this.alignment === "left" ? this.padding + this.borderWidth : this.alignment === "center" ? w / 2 : w - this.padding - this.borderWidth;
		
		for (let i = 0; i < lines.length; i++) {
			const line: string = lines[i];
			context.fillText(line, offset, i * this.fontSize + this.padding + this.borderWidth);
		}

		createImageBitmap(buffer).then(imageBitmap => {
			this.texture = imageBitmap;
		});
	}
}