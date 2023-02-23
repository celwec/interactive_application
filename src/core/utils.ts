function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

function clamp(val: number, min: number, max: number): number {
	return Math.min(Math.max(val, min), max);
}

function rgbaToHex(rgba: number[]): string {
	const hex: string = rgba
		.map((color) =>
			Math.round(color * 255)
				.toString(16)
				.padStart(2, "0")
		)
		.join("");

	return "#" + hex;
}
