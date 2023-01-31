function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

function clamp(val: number, min: number, max: number): number {
	return Math.min(Math.max(val, min), max);
}