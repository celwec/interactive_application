class Renderable {
	public backgroundColor: number[];
	public height: number;
	public isRendered: boolean;
	public layer: number;
	public shape: Polygon;
	public texture: TexImageSource;
	public type: "message" | "polygon" | "sprite";
	public width: number;

	public alignment?: "left" | "center" | "right";
	public animations?: Map<string, Frame[]>;
	public borderColor?: number[];
	public borderWidth?: number;
	public content?: string;
	public currentAnimation?: string;
	public fillStyle?: number[];
	public fontColor?: string;
	public fontFamily?: string;
	public fontSize?: number;
	public frameIndex?: number;
	public padding?: number;
	public url?: string;
	public autobreak?: number;

	public static message(config: {
		alignment?: "left" | "center" | "right";
		borderColor?: number[];
		borderWidth?: number;
		content?: string;
		fontColor?: string;
		fontFamily?: string;
		fontSize?: number;
		layer?: number;
		padding?: number;
		shape?: Polygon;
		fillStyle?: number[];
		isRendered?: boolean;
		autobreak: number;
	}): Renderable {
		const renderable: Renderable = new Renderable();

		renderable.isRendered = config.isRendered || true;
		renderable.alignment = config.alignment || "left";
		renderable.backgroundColor = [1, 1, 1, 1];
		renderable.borderColor = config.borderColor;
		renderable.borderWidth = config.borderWidth || 0;
		renderable.content = config.content || "";
		renderable.fillStyle = config.fillStyle;
		renderable.fontColor = config.fontColor || "#000000";
		renderable.fontFamily = config.fontFamily || "monospace";
		renderable.fontSize = config.fontSize || 16;
		renderable.layer = config.layer || 0;
		renderable.padding = config.padding || 0;
		renderable.shape = config.shape || new Polygon();
		renderable.type = "message";
		renderable.autobreak = config.autobreak;

		if (renderable.autobreak > 0) {
			let charOffset: number = 0;

			for (let i = 0; i < renderable.content.length; i++) {
				let char: string = renderable.content[i];

				if (char === "_") {
					renderable.content =
						renderable.content.substring(0, i) + "\n\n" + renderable.content.substring(i + "_".length);
					charOffset = i - 1;
				}

				if ((i - charOffset) % renderable.autobreak === 0) {
					if (char === " ") {
						renderable.content =
							renderable.content.substring(0, i) + "\n" + renderable.content.substring(i + "\n".length);
					} else {
						const n: number = renderable.content.lastIndexOf(" ", i);
						renderable.content =
							renderable.content.substring(0, n) + "\n" + renderable.content.substring(n + "\n".length);
					}
				}
			}
		}

		if (renderable.content.indexOf("\n") === 0) {
			renderable.content = renderable.content.slice(1);
		}
		const lines: string[] = renderable.content.split("\n");
		const fontWidth: number = (renderable.fontSize * 3) / 5;
		const w: number =
			fontWidth *
				renderable.content
					.split("\n")
					.reduce((maxLength: number, line: string) => Math.max(maxLength, line.length), 0) +
			renderable.padding * 2 +
			renderable.borderWidth * 2;
		const h: number = renderable.fontSize * lines.length + renderable.padding * 2 + renderable.borderWidth * 2 - 4;

		renderable.width = w;
		renderable.height = h;

		const buffer: OffscreenCanvas = new OffscreenCanvas(w, h);
		const context: OffscreenCanvasRenderingContext2D = <OffscreenCanvasRenderingContext2D>buffer.getContext("2d");

		context.textBaseline = "top";
		context.textAlign = renderable.alignment;

		if (renderable.borderWidth > 1 && renderable.borderColor) {
			context.fillStyle = rgbaToHex(renderable.borderColor);
			context.fillRect(0, 0, w, h);
		}

		if (renderable.fillStyle) {
			context.fillStyle = rgbaToHex(renderable.fillStyle);
			context.fillRect(
				renderable.borderWidth,
				renderable.borderWidth,
				w - renderable.borderWidth * 2,
				h - renderable.borderWidth * 2
			);
		}

		context.font = `${renderable.fontSize}px ${renderable.fontFamily}`;
		context.fillStyle = renderable.fontColor;

		const offset: number =
			renderable.alignment === "left"
				? renderable.padding + renderable.borderWidth
				: renderable.alignment === "center"
				? w / 2
				: w - renderable.padding - renderable.borderWidth;

		for (let i = 0; i < lines.length; i++) {
			const line: string = lines[i];
			context.fillText(line, offset, i * renderable.fontSize + renderable.padding + renderable.borderWidth);
		}

		renderable.texture = buffer.transferToImageBitmap();

		return renderable;
	}

	public static polygon(config: {
		backgroundColor?: number[];
		borderColor?: number[];
		borderWidth?: number;
		layer?: number;
		shape?: Polygon;
		isRendered?: boolean;
	}): Renderable {
		const renderable: Renderable = new Renderable();

		renderable.isRendered = config.isRendered || true;
		renderable.backgroundColor = config.backgroundColor || [1, 1, 1, 1];
		renderable.borderColor = config.borderColor;
		renderable.borderWidth = config.borderWidth;
		renderable.layer = config.layer || 0;
		renderable.shape = config.shape || new Polygon();
		renderable.type = "polygon";
		renderable.width = 1;
		renderable.height = 1;

		const off = new OffscreenCanvas(1, 1);
		const ctx = <OffscreenCanvasRenderingContext2D>off.getContext("2d");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, 1, 1);
		renderable.texture = off;

		return renderable;
	}

	public static sprite(config: {
		animations: Map<string, Frame[]>;
		currentAnimation?: string;
		frameIndex?: number;
		layer?: number;
		shape?: Polygon;
		url: string;
		isRendered?: boolean;
	}): Renderable {
		const rect: Rectangle = new Rectangle(1, 1);
		const poly: Polygon = new Polygon([rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]);

		const renderable: Renderable = new Renderable();

		const image: HTMLImageElement = new Image();
		image.src = config.url;

		renderable.isRendered = config.isRendered || true;
		renderable.animations = config.animations || new Map<string, Frame[]>();
		renderable.backgroundColor = [1, 1, 1, 1];
		renderable.currentAnimation = config.currentAnimation || "idle";
		renderable.frameIndex = config.frameIndex || 0;
		renderable.height = image.height;
		renderable.layer = config.layer || 0;
		renderable.shape = config.shape || new Polygon();
		renderable.shape = poly;
		renderable.texture = image;
		renderable.type = "sprite";
		renderable.width = image.width;

		return renderable;
	}

	public static skillUp(config: {
		amount?: number;
		backgroundColor?: number[];
		layer?: number;
		isRendered?: boolean;
	}) {
		const poly: Polygon = new Polygon([
			new Point(0.215, 0.264),
			new Point(-0.0819, -0.0375),
			new Point(-0.0816, 0.0381),
			new Point(0.00868, -0.0934),
			new Point(-0.0598, -0.0697),
			new Point(0.0873, -0.0202),
			new Point(0.0447, -0.0813),
			new Point(0.0452, 0.0809),
			new Point(0.0874, 0.0195),
			new Point(-0.0593, 0.0702),
		]);

		const renderable: Renderable = new Renderable();

		renderable.isRendered = config.isRendered || true;
		renderable.backgroundColor = config.backgroundColor || colorSkillFill;
		renderable.type = "polygon";
		renderable.width = 1;
		renderable.height = 1;
		renderable.layer = config.layer || 110;
		renderable.shape = poly;

		const off = new OffscreenCanvas(1, 1);
		const ctx = <OffscreenCanvasRenderingContext2D>off.getContext("2d");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, 1, 1);
		renderable.texture = off;

		return renderable;
	}

	public set Content(text: string) {
		this.content = text;
		this._createTexture();
	}

	public nextFrame(): void {
		if (this.animations === undefined || this.frameIndex === undefined || this.currentAnimation === undefined) {
			return;
		}

		const animation: Frame[] | undefined = this.animations.get(this.currentAnimation);

		if (!animation) {
			return;
		}

		const frame: Frame = animation[this.frameIndex];

		this.texture = frame.texture;
		// this.frameIndex = (this.frameIndex + 1) % animation.length;
	}

	private _createTexture() {
		if (
			!this.content ||
			!this.fontSize ||
			!this.padding ||
			!this.borderWidth ||
			!this.alignment ||
			!this.fontColor
		) {
			return;
		}

		const lines: string[] = this.content.split("\n");

		const fontWidth: number = (this.fontSize * 3) / 5;
		const w: number =
			fontWidth *
				this.content
					.split("\n")
					.reduce((maxLength: number, line: string) => Math.max(maxLength, line.length), 0) +
			this.padding * 2 +
			this.borderWidth * 2;
		const h: number = this.fontSize * this.content.split("\n").length + this.padding * 2 + this.borderWidth * 2;

		this.width = w;
		this.height = h;

		const buffer: OffscreenCanvas = new OffscreenCanvas(w, h);
		const context: OffscreenCanvasRenderingContext2D = <OffscreenCanvasRenderingContext2D>buffer.getContext("2d");

		context.textBaseline = "top";
		context.textAlign = this.alignment;

		if (this.borderWidth > 1 && this.borderColor) {
			context.fillStyle = rgbaToHex(this.borderColor);
			context.fillRect(0, 0, w, h);
		}

		if (this.fillStyle) {
			context.fillStyle = rgbaToHex(this.fillStyle);
			context.fillRect(this.borderWidth, this.borderWidth, w - this.borderWidth * 2, h - this.borderWidth * 2);
		}

		context.font = `${this.fontSize}px ${this.fontFamily}`;
		context.fillStyle = this.fontColor;

		const offset: number =
			this.alignment === "left"
				? this.padding + this.borderWidth
				: this.alignment === "center"
				? w / 2
				: w - this.padding - this.borderWidth;

		for (let i = 0; i < lines.length; i++) {
			const line: string = lines[i];
			context.fillText(line, offset, i * this.fontSize + this.padding + this.borderWidth);
		}

		this.texture = buffer;
	}
}
