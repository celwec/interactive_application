class Entity extends Map {
    all(componentTypes) {
        let foundComponents = new ComponentMap();
        for (let i = 0; i < componentTypes.length; i++) {
            const componentType = componentTypes[i];
            const foundComponent = this.get(componentType.name);
            if (foundComponent) {
                foundComponents.set(foundComponent.constructor.name, foundComponent);
            }
        }
        if (foundComponents.size === componentTypes.length) {
            return foundComponents;
        }
        else {
            return undefined;
        }
    }
    any(componentTypes) {
        let hasMatchingComponents = false;
        for (let i = 0; i < componentTypes.length; i++) {
            const component = componentTypes[i];
            if (this.has(component.name)) {
                hasMatchingComponents = true;
            }
        }
        if (hasMatchingComponents) {
            return this;
        }
        else {
            return undefined;
        }
    }
}
class EntityArray extends Array {
    all(components) {
        let filtered = new EntityArray();
        for (let i = 0; i < this.length; i++) {
            const entity = this[i];
            if (entity.all(components)) {
                filtered.push(entity);
            }
        }
        return filtered;
    }
    any(components) {
        let filtered = new EntityArray();
        for (let i = 0; i < this.length; i++) {
            const entity = this[i];
            if (entity.any(components)) {
                filtered.push(entity);
            }
        }
        return filtered;
    }
}
class Component {
}
class ComponentMap extends Map {
    all(componentTypes) {
        let foundComponents = new ComponentMap();
        for (let i = 0; i < componentTypes.length; i++) {
            const componentType = componentTypes[i];
            const foundComponent = this.get(componentType.name);
            if (foundComponent) {
                foundComponents.set(foundComponent.constructor.name, foundComponent);
            }
        }
        if (foundComponents.size === componentTypes.length) {
            return foundComponents;
        }
        else {
            return undefined;
        }
    }
    any(componentTypes) {
        let hasMatchingComponents = false;
        for (let i = 0; i < componentTypes.length; i++) {
            const component = componentTypes[i];
            if (this.has(component.name)) {
                hasMatchingComponents = true;
            }
        }
        if (hasMatchingComponents) {
            return this;
        }
        else {
            return undefined;
        }
    }
}
class SystemArray extends Array {
    add(system) {
        this.push(typeof system);
        return this;
    }
}
class Matrix {
    static multiply(a, b) {
        const a00 = a[0 * 3 + 0];
        const a01 = a[0 * 3 + 1];
        const a02 = a[0 * 3 + 2];
        const a10 = a[1 * 3 + 0];
        const a11 = a[1 * 3 + 1];
        const a12 = a[1 * 3 + 2];
        const a20 = a[2 * 3 + 0];
        const a21 = a[2 * 3 + 1];
        const a22 = a[2 * 3 + 2];
        const b00 = b[0 * 3 + 0];
        const b01 = b[0 * 3 + 1];
        const b02 = b[0 * 3 + 2];
        const b10 = b[1 * 3 + 0];
        const b11 = b[1 * 3 + 1];
        const b12 = b[1 * 3 + 2];
        const b20 = b[2 * 3 + 0];
        const b21 = b[2 * 3 + 1];
        const b22 = b[2 * 3 + 2];
        return new Float32Array([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);
    }
    static project(m, w, h) {
        return new Float32Array([
            2 / w, 0, 0,
            0, -2 / h, 0,
            -1, 1, 1,
        ]);
    }
    static translate(m, x, y) {
        return Matrix.multiply(m, Matrix.translation(x, y));
    }
    static scale(m, x, y) {
        return Matrix.multiply(m, Matrix.scaling(x, y));
    }
    static identity() {
        return new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ]);
    }
    static translation(x, y) {
        return new Float32Array([
            1, 0, 0,
            0, 1, 0,
            x, y, 1,
        ]);
    }
    static scaling(x, y) {
        return new Float32Array([
            x, 0, 0,
            0, y, 0,
            0, 0, 1,
        ]);
    }
}
class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    static get zero() {
        return new Vector(0, 0);
    }
    static get one() {
        return new Vector(1, 1);
    }
    static fromRadians(other) {
        const x = Math.cos(other);
        const y = Math.sin(other);
        return new Vector(x, y);
    }
    static fromDegrees(other) {
        const x = Math.cos(other * (Math.PI / 180));
        const y = Math.sin(other * (Math.PI / 180));
        return new Vector(x, y);
    }
    get normal() {
        return new Vector(this.y, -this.x);
    }
    get radians() {
        return Math.atan2(this.y, this.x);
    }
    set radians(other) {
        this.x = Math.cos(other);
        this.y = Math.sin(other);
    }
    get degrees() {
        return this.radians * (180 / Math.PI);
    }
    set degrees(other) {
        this.x = Math.cos(other * (Math.PI / 180));
        this.y = Math.sin(other * (Math.PI / 180));
    }
    add(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Vector(this.x + other.x, this.y + other.y);
        }
        else {
            return new Vector(this.x + other, this.y + other);
        }
    }
    subtract(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Vector(this.x - other.x, this.y - other.y);
        }
        else {
            return new Vector(this.x - other, this.y - other);
        }
    }
    multiply(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Vector(this.x * other.x, this.y * other.y);
        }
        else {
            return new Vector(this.x * other, this.y * other);
        }
    }
    divide(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Vector(this.x / other.x, this.y / other.y);
        }
        else {
            return new Vector(this.x / other, this.y / other);
        }
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(this.x / length, this.y / length);
    }
    toPoint() {
        return new Point(this.x, this.y);
    }
}
class Force {
    linear;
    rotational;
    scalar;
    constructor(settings) {
        this.linear = settings?.linear || new Vector();
        this.rotational = settings?.rotational || new Vector();
        this.scalar = settings?.scalar || new Vector(1, 1);
    }
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Point(this.x + other.x, this.y + other.y);
        }
        else {
            return new Point(this.x + other, this.y + other);
        }
    }
    subtract(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Point(this.x - other.x, this.y - other.y);
        }
        else {
            return new Point(this.x - other, this.y - other);
        }
    }
    multiply(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Point(this.x * other.x, this.y * other.y);
        }
        else {
            return new Point(this.x * other, this.y * other);
        }
    }
    divide(other) {
        if (other instanceof Vector || other instanceof Point) {
            return new Point(this.x / other.x, this.y / other.y);
        }
        else {
            return new Point(this.x / other, this.y / other);
        }
    }
    toVector() {
        return new Vector(this.x, this.y);
    }
}
class Segment {
    start;
    end;
    constructor(x0, y0, x1, y1) {
        this.start = new Point(x0, y0);
        this.end = new Point(x1, y1);
    }
    add(other) {
        return new Segment(this.start.x + other.x, this.start.y + other.y, this.end.x + other.x, this.end.y + other.y);
    }
    toPoint() {
        return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
    }
    toVector() {
        return new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
    }
}
class Rectangle {
    size;
    constructor(w, h) {
        this.size = new Vector();
        this.size.x = w || 1;
        this.size.y = h || 1;
    }
    get topLeft() {
        return new Point(0, 0);
    }
    get topRight() {
        return new Point(this.size.x, 0);
    }
    get bottomRight() {
        return new Point(0, this.size.y);
    }
    get bottomLeft() {
        return new Point(this.size.x, this.size.y);
    }
}
class Ellipse {
    size;
    constructor(rx, ry) {
        this.size.x = rx || 1;
        this.size.y = ry || 1;
    }
}
class Polygon {
    vertices;
    points;
    edges;
    normals;
    constructor(points) {
        this.points = points || [];
        this.vertices = [];
        this.edges = [];
        this.normals = [];
        for (let i = 0; i < this.points.length; i++) {
            const p0 = this.points[i];
            const p1 = this.points[(i + 1) % this.points.length];
            const edge = new Segment(p0.x, p0.y, p1.x, p1.y);
            const normal = edge.toVector().normalize().normal;
            this.edges.push(edge);
            this.normals.push(normal);
        }
        this.vertices = this._tri();
    }
    _tri() {
        let triangles = [];
        for (let i = 0; i < this.points.length; i++) {
            const current = this.points[i];
            const next = this.points[(i + 1) % this.points.length];
            const center = this._center();
            triangles.push([current, next, center]);
        }
        const flattened = [].concat.apply([], triangles);
        let vertices = [];
        for (let i = 0; i < flattened.length; i++) {
            const p = flattened[i];
            vertices.push(p.x);
            vertices.push(p.y);
        }
        return vertices;
    }
    _center() {
        let maxX = -Infinity;
        let maxY = -Infinity;
        let minX = Infinity;
        let minY = Infinity;
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
        }
        const ax = (maxX + minX) / 2;
        const ay = (maxY + minY) / 2;
        return new Point(ax, ay);
    }
    _triangulate() {
        let points = this.points.slice();
        let triangles = [];
        let n = this.points.length;
        while (n > 3) {
            for (let i = 0; i < n; i++) {
                const previous = points[(i + n - 1) % n];
                const p = points[i];
                const next = points[(i + 1) % n];
                triangles.push([previous, p, next]);
                points.splice(i, 1);
                n--;
            }
        }
        triangles.push(points);
        const flattened = [].concat.apply([], triangles);
        let vertices = [];
        for (let i = 0; i < flattened.length; i++) {
            const p = flattened[i];
            vertices.push(p.x);
            vertices.push(p.y);
        }
        return vertices;
    }
}
const vertexShaderCode = `
	attribute vec2 a_position;
	uniform mat3 u_matrix;

	void main() {
		gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
	}
`;
const fragmentShaderCode = `
	precision mediump float;

	uniform vec4 u_color;

	void main() {
		gl_FragColor = u_color;
	}
`;
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) {
        return;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return;
    }
    return shader;
}
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    if (!program) {
        console.error(`Could not create program on ${gl}`);
        return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}
const colorCanvasFill = [28 / 255, 22 / 255, 58 / 255, 1];
const colorGroundFill = [4 / 255, 3 / 255, 8 / 255, 1];
const colorCloudFill = [234 / 255, 0 / 255, 100 / 255, 1];
const colorStarFill = [0 / 255, 192 / 255, 178 / 255, 1];
const colorBuildingFill = [17 / 255, 14 / 255, 35 / 255, 1];
const colorWindowFill = [149 / 255, 114 / 255, 0 / 255, 1];
class Player {
    runSpeed;
    walkSpeed;
    isJumping;
    jumpStartTime;
    jumpDurationMs;
    jumpSpeed;
    jumpStartY;
    jumpEndY;
    jumpHeight;
    isCasting;
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
    get jumpFinished() {
        return performance.now() - this.jumpStartTime > this.jumpDurationMs;
    }
    get jumpElapsedTime() {
        return performance.now() - this.jumpStartTime;
    }
}
class Transform {
    position;
    rotation;
    scale;
    lastPosition;
    lastRotation;
    lastScale;
    constructor(settings) {
        this.position = settings?.position || new Vector();
        this.rotation = settings?.rotation || new Vector();
        this.scale = settings?.scale || new Vector(1, 1);
        this.lastPosition = this.position;
        this.lastRotation = this.rotation;
        this.lastScale = this.scale;
    }
    get matrix() {
        const tx = this.position.x;
        const ty = this.position.y;
        const rc = this.rotation.x;
        const rs = this.rotation.y;
        const sx = this.scale.x;
        const sy = this.scale.y;
        return new Float32Array([
            rc * sx, -rs, 0,
            rs, rc * sy, 0,
            tx, ty, 1,
        ]);
    }
    set matrix(m) {
        this.position.x = m[6];
        this.position.y = m[7];
        this.scale.x = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
        this.scale.y = Math.sqrt(m[3] * m[3] + m[4] * m[4]);
        this.rotation.x = m[0] / this.scale.x;
        this.rotation.y = m[3] / this.scale.y;
    }
}
class Solid {
    collider;
    friction;
    gravity;
    velocity;
    isCollisionEnabled;
    isGravityEnabled;
    isStatic;
    constructor(settings) {
        this.collider = settings?.collider || new Polygon();
        this.friction = settings?.friction || new Force();
        this.gravity = settings?.gravity || new Force();
        this.velocity = settings?.velocity || new Force();
        this.isCollisionEnabled = settings?.isCollisionEnabled || false;
        this.isGravityEnabled = settings?.isGravityEnabled || false;
        this.isStatic = settings?.isStatic || false;
    }
}
class Colorable {
    layer;
    shape;
    backgroundColor;
    borderColor;
    borderWidth;
    constructor(settings) {
        this.layer = settings?.layer || 0;
        this.shape = settings?.shape || new Polygon();
        this.backgroundColor = settings?.backgroundColor;
        this.borderColor = settings?.borderColor;
        this.borderWidth = settings?.borderWidth || 0;
    }
}
class Movement {
    update(entities) {
        const filtered = entities.all([Transform, Solid]);
        for (let i = 0; i < filtered.length; i++) {
            const entity = filtered[i];
            const transform = entity.get(Transform.name);
            const solid = entity.get(Solid.name);
            if (!transform || !solid) {
                return;
            }
            transform.lastPosition = transform.position;
            transform.position = transform.position.add(solid.velocity.linear);
        }
    }
}
class Physics {
    update() {
        const filtered = entities.all([Solid]);
        if (filtered.length < 1) {
            return;
        }
        for (let i = 0; i < filtered.length; i++) {
            const a = filtered[i];
            const sa = a.get(Solid.name);
            this.processFriction(sa);
            this.processGravity(sa);
            if (!sa.isCollisionEnabled) {
                continue;
            }
            for (let j = i + 1; j < filtered.length; j++) {
                const ta = a.get(Transform.name);
                if (!ta) {
                    break;
                }
                const b = filtered[j];
                const sb = b.get(Solid.name);
                if (!sb || !sb.isCollisionEnabled) {
                    continue;
                }
                const tb = b.get(Transform.name);
                if (!tb) {
                    continue;
                }
                this.processCollision(sa, sb, ta, tb);
            }
        }
    }
    processGravity(solid) {
        if (solid.isGravityEnabled) {
            solid.velocity.linear = solid.velocity.linear.add(solid.gravity.linear);
        }
    }
    processFriction(solid) {
        solid.velocity.linear = solid.velocity.linear.multiply(Vector.one.subtract(solid.friction.linear));
        solid.velocity.rotational = solid.velocity.rotational.multiply(solid.friction.rotational);
        solid.velocity.scalar = solid.velocity.scalar.multiply(solid.friction.scalar);
        if (Math.abs(solid.velocity.linear.x) < 0.01) {
            solid.velocity.linear.x = 0;
        }
        if (Math.abs(solid.velocity.linear.y) < 0.01) {
            solid.velocity.linear.y = 0;
        }
    }
    processCollision(sa, sb, ta, tb) {
        const collision = this._staticSAT(sa, sb, ta, tb);
    }
    _staticSAT(sa, sb, ta, tb) {
        let smallestOverlap = Infinity;
        let axis = new Vector();
        for (let i = 0; i < sa.collider.normals.length; i++) {
            const normal = sa.collider.normals[i];
            let maxA = -Infinity;
            let maxB = -Infinity;
            let minA = Infinity;
            let minB = Infinity;
            for (let j = 0; j < sa.collider.points.length; j++) {
                const vertex = sa.collider.points[j].add(ta.position);
                const dot = vertex.toVector().dot(normal);
                maxA = Math.max(maxA, dot);
                minA = Math.min(minA, dot);
            }
            for (let j = 0; j < sb.collider.points.length; j++) {
                const vertex = sb.collider.points[j].add(tb.position);
                const dot = vertex.toVector().dot(normal);
                maxB = Math.max(maxB, dot);
                minB = Math.min(minB, dot);
            }
            if (maxA < minB || maxB < minA) {
                return false;
            }
            const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
            if (overlap < smallestOverlap) {
                smallestOverlap = overlap;
                axis = normal;
            }
        }
        for (let i = 0; i < sb.collider.normals.length; i++) {
            const normal = sa.collider.normals[i];
            let maxA = -Infinity;
            let maxB = -Infinity;
            let minA = Infinity;
            let minB = Infinity;
            for (let j = 0; j < sa.collider.points.length; j++) {
                const vertex = sa.collider.points[j].add(ta.position);
                const dot = vertex.toVector().dot(normal);
                maxA = Math.max(maxA, dot);
                minA = Math.min(minA, dot);
            }
            for (let j = 0; j < sb.collider.points.length; j++) {
                const vertex = sb.collider.points[j].add(tb.position);
                const dot = vertex.toVector().dot(normal);
                maxB = Math.max(maxB, dot);
                minB = Math.min(minB, dot);
            }
            if (maxA < minB || maxB < minA) {
                return false;
            }
            const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
            if (overlap < smallestOverlap) {
                smallestOverlap = overlap;
                axis = normal;
            }
        }
        if (tb.position.subtract(ta.position).dot(axis) > 0) {
            axis = axis.multiply(-1);
        }
        const resolution = axis.multiply(smallestOverlap);
        if (!sa.isStatic) {
            ta.position = ta.position.add(resolution);
        }
        if (!sb.isStatic) {
            tb.position = tb.position.add(resolution);
        }
        return false;
    }
}
class App {
    _entities;
    _systems;
    _keyStates;
    _currentTime;
    _lastTime;
    _elapsedTime;
    _updateBehindTime;
    _renderBehindTime;
    _msPerUpdate;
    _msPerRender;
    _canvas;
    _canvasWidth;
    _canvasHeight;
    _gl;
    _program;
    _positionAttributeLocation;
    _matrixUniformLocation;
    _colorUniformLocation;
    _positionBuffer;
    constructor(entities, systems) {
        this._entities = entities;
        this._systems = systems;
        this._keyStates = Object;
        this._currentTime = 0;
        this._lastTime = 0;
        this._elapsedTime = 0;
        this._updateBehindTime = 0;
        this._renderBehindTime = 0;
        this._msPerUpdate = 1000 / 60;
        this._msPerRender = 1000 / 240;
        this._loop = this._loop.bind(this);
        this._processInput = this._processInput.bind(this);
        this._keyboardEventHandler = this._keyboardEventHandler.bind(this);
        document.addEventListener("keydown", this._keyboardEventHandler);
        document.addEventListener("keyup", this._keyboardEventHandler);
        this._canvas = document.getElementById("game-canvas");
        if (!this._canvas) {
            console.error("Canvas not found");
            return;
        }
        this._canvasWidth = this._canvas.clientWidth;
        this._canvasHeight = this._canvas.clientHeight;
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;
        this._gl = this._canvas.getContext("webgl2");
        if (!this._gl) {
            console.error("This browser does not support webgl2");
            return;
        }
        const vertexShader = createShader(this._gl, this._gl.VERTEX_SHADER, vertexShaderCode);
        const fragmentShader = createShader(this._gl, this._gl.FRAGMENT_SHADER, fragmentShaderCode);
        if (!vertexShader || !fragmentShader) {
            console.error("Could not create shaders");
            return;
        }
        this._program = createProgram(this._gl, vertexShader, fragmentShader);
        if (!this._program) {
            console.error("Could not create program");
            return;
        }
        this._positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
        this._matrixUniformLocation = this._gl.getUniformLocation(this._program, "u_matrix");
        this._colorUniformLocation = this._gl.getUniformLocation(this._program, "u_color");
        if (!this._matrixUniformLocation || !this._colorUniformLocation) {
            console.error("Could not get uniform location");
            return;
        }
        this._positionBuffer = this._gl.createBuffer();
        if (!this._positionBuffer) {
            console.error("Could not create position buffer");
            return;
        }
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
        this._gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
        this._gl.clearColor(28 / 255, 22 / 255, 58 / 255, 1);
        requestAnimationFrame(this._loop);
    }
    _loop() {
        this._currentTime = performance.now();
        this._elapsedTime = this._currentTime - this._lastTime;
        this._lastTime = this._currentTime;
        this._updateBehindTime += this._elapsedTime;
        this._renderBehindTime += this._elapsedTime;
        this._processInput();
        if (this._updateBehindTime >= this._msPerUpdate) {
            this._update();
            this._updateBehindTime -= this._msPerUpdate;
        }
        if (this._renderBehindTime >= this._msPerRender) {
            this._render();
            this._renderBehindTime -= this._msPerRender;
        }
        requestAnimationFrame(this._loop);
    }
    _processInput() {
        const filtered = entities.all([Player, Transform, Solid]);
        if (filtered.length !== 1) {
            return;
        }
        const entity = filtered[0];
        const player = entity.get(Player.name);
        const transform = entity.get(Transform.name);
        const solid = entity.get(Solid.name);
        if (!player || !transform || !solid) {
            return;
        }
        const speed = this._keyStates["shift"] ? player.runSpeed : player.walkSpeed;
        if (this._keyStates["a_down"] || this._keyStates["arrowleft_down"]) {
            solid.velocity.linear.x -= speed;
        }
        if (this._keyStates["d_down"] || this._keyStates["arrowright_down"]) {
            solid.velocity.linear.x += speed;
        }
        if (!player.isCasting && (this._keyStates["e_down"] || this._keyStates["enter_down"])) {
            player.isCasting = true;
        }
        if (!this._keyStates["e_down"] && !this._keyStates["enter_down"]) {
            player.isCasting = false;
        }
        if (this._keyStates[" _down"] && !player.isJumping && transform.lastPosition.y === transform.position.y) {
            player.jumpStartTime = performance.now();
            player.isJumping = true;
            player.jumpStartY = transform.position.y;
            player.jumpEndY = transform.position.y - player.jumpHeight;
        }
        if (!this._keyStates[" _down"]) {
            player.isJumping = false;
        }
        if (this._keyStates[" _down"] && player.isJumping && !player.jumpFinished) {
            if (transform.position.y > player.jumpEndY) {
                solid.velocity.linear.y = -player.jumpSpeed;
            }
        }
        if (this._keyStates["q_down"]) {
            solid.velocity.rotational.radians -= speed;
        }
        if (this._keyStates["e_down"]) {
            solid.velocity.rotational.radians += speed;
        }
        if (this._keyStates["r_down"]) {
            solid.velocity.scalar.x -= speed;
        }
        if (this._keyStates["t_down"]) {
            solid.velocity.scalar.x += speed;
        }
        if (this._keyStates["f_down"]) {
            solid.velocity.scalar.y -= speed;
        }
        if (this._keyStates["g_down"]) {
            solid.velocity.scalar.y += speed;
        }
        if (this._keyStates["w_down"] || this._keyStates["arrowleft_down"]) {
            solid.velocity.linear.y -= speed;
        }
        if (this._keyStates["s_down"] || this._keyStates["arrowright_down"]) {
            solid.velocity.linear.y += speed;
        }
    }
    _update() {
        for (let i = 0; i < this._systems.length; i++) {
            const system = this._systems[i];
            system.update(this._entities);
        }
    }
    _render() {
        if (!this._gl) {
            return;
        }
        const player = this._entities.all([Player])[0];
        const playerTransform = player.get(Transform.name);
        if (!playerTransform) {
            return;
        }
        const filtered = this._entities.all([Colorable, Transform, Solid]).sort((a, b) => {
            const ac = a.get(Colorable.name);
            const bc = b.get(Colorable.name);
            return ac.layer - bc.layer;
        });
        if (filtered.length < 1) {
            return;
        }
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.useProgram(this._program);
        this._gl.enableVertexAttribArray(this._positionAttributeLocation);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
        const size = 2;
        const type = this._gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this._gl.vertexAttribPointer(this._positionAttributeLocation, size, type, normalize, stride, offset);
        for (let i = 0; i < filtered.length; i++) {
            const entity = filtered[i];
            const transform = entity.get(Transform.name);
            const solid = entity.get(Solid.name);
            const colorable = entity.get(Colorable.name);
            const backgroundColor = colorable.backgroundColor ? colorable.backgroundColor : [0, 0, 0, 1];
            const dx = transform.position.x - playerTransform.position.x;
            const dy = transform.position.y - playerTransform.position.y;
            let matrix = transform.matrix;
            matrix = Matrix.project(matrix, this._canvasWidth, this._canvasHeight);
            matrix = Matrix.translate(matrix, this._canvasWidth / 2 + dx, this._canvasHeight * 68 / 100 + dy);
            matrix = Matrix.scale(matrix, transform.scale.x, transform.scale.y);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(solid.collider.vertices), this._gl.STATIC_DRAW);
            this._gl.uniformMatrix3fv(this._matrixUniformLocation, false, matrix);
            this._gl.uniform4f(this._colorUniformLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
            const primitiveType = this._gl.TRIANGLES;
            const count = solid.collider.vertices.length / 2;
            this._gl.drawArrays(primitiveType, offset, count);
        }
    }
    _keyboardEventHandler(keyboardEvent) {
        const key = keyboardEvent.key.toLowerCase();
        if (keyboardEvent.type === "keydown" && !this._keyStates[`${key}_down`]) {
            this._keyStates[`${key}_down`] = true;
            this._keyStates[`${key}_time`] = performance.now();
        }
        else if (keyboardEvent.type === "keyup" && this._keyStates[`${key}_down`]) {
            this._keyStates[`${key}_down`] = false;
        }
        this._keyStates["shift"] = keyboardEvent.shiftKey;
        if (keyboardEvent.key === " ") {
            keyboardEvent.preventDefault();
        }
    }
}
function createPlayer(x, y) {
    const rect = new Rectangle(32, 32);
    const poly = new Polygon([
        rect.topLeft,
        rect.topRight,
        rect.bottomLeft,
        rect.bottomRight,
    ]);
    const entity = new Entity();
    const player = new Player();
    const transform = new Transform({
        position: new Vector(x, y),
    });
    const solid = new Solid({
        collider: poly,
        gravity: new Force({
            linear: new Vector(0, 2),
        }),
        friction: new Force({
            linear: new Vector(0.2, 0.2),
        }),
        isCollisionEnabled: true,
        isGravityEnabled: true,
        isStatic: false,
    });
    const colorable = new Colorable({
        layer: 100,
        shape: poly,
        backgroundColor: colorGroundFill,
    });
    entity.set(Player.name, player);
    entity.set(Transform.name, transform);
    entity.set(Solid.name, solid);
    entity.set(Colorable.name, colorable);
    return entity;
}
function createGround(x, y, w, h) {
    const rect = new Rectangle(w, h);
    const poly = new Polygon([
        rect.topLeft,
        rect.topRight,
        rect.bottomLeft,
        rect.bottomRight,
    ]);
    const entity = new Entity();
    const transform = new Transform({
        position: new Vector(x, y),
    });
    const solid = new Solid({
        collider: poly,
        isCollisionEnabled: true,
        isStatic: true,
        isGravityEnabled: false,
    });
    const colorable = new Colorable({
        layer: 20,
        shape: poly,
        backgroundColor: colorGroundFill,
    });
    entity.set(Transform.name, transform);
    entity.set(Solid.name, solid);
    entity.set(Colorable.name, colorable);
    return entity;
}
function createCloud(minX, maxX, minY, maxY) {
    const type1 = new Polygon([
        new Point(31.773, 0),
        new Point(29.1129, 0.156405),
        new Point(26.4827, 0.625165),
        new Point(23.9195, 1.41069),
        new Point(21.4631, 2.51753),
        new Point(19.1571, 3.95284),
        new Point(17.0626, 5.71753),
        new Point(15.2485, 7.80841),
        new Point(13.7971, 10.2048),
        new Point(13.0246, 10.12),
        new Point(10.9688, 10.7401),
        new Point(9.38909, 12.2977),
        new Point(8.25017, 14.7968),
        new Point(7.88303, 17.556),
        new Point(7.89847, 18.1161),
        new Point(5.48206, 19.6181),
        new Point(3.33345, 21.5344),
        new Point(1.5878, 23.8704),
        new Point(0.417708, 26.5863),
        new Point(0, 29.5407),
        new Point(0.432303, 32.5612),
        new Point(1.64986, 35.3269),
        new Point(3.46395, 37.6925),
        new Point(5.6854, 39.6177),
        new Point(8.17833, 41.1154),
        new Point(10.8475, 42.2084),
        new Point(13.627, 42.9189),
        new Point(16.4676, 43.2652),
        new Point(18.4254, 45.1783),
        new Point(20.7793, 46.4913),
        new Point(23.3115, 47.3515),
        new Point(25.9289, 47.8409),
        new Point(28.5836, 48),
        new Point(31.5442, 47.8022),
        new Point(34.4539, 47.188),
        new Point(37.2346, 46.0927),
        new Point(39.7235, 44.3783),
        new Point(41.4522, 41.8301),
        new Point(43.9204, 41.9315),
        new Point(46.752, 41.8059),
        new Point(49.5625, 41.4224),
        new Point(52.3285, 40.7661),
        new Point(55.0179, 39.8142),
        new Point(57.585, 38.5322),
        new Point(59.9545, 36.8701),
        new Point(61.9909, 34.765),
        new Point(63.4528, 32.1743),
        new Point(64, 29.2131),
        new Point(63.4776, 26.3322),
        new Point(62.0867, 23.7965),
        new Point(60.1413, 21.7181),
        new Point(60.9207, 19.4819),
        new Point(61.1919, 17.1106),
        new Point(60.7363, 14.0301),
        new Point(59.4415, 11.2318),
        new Point(57.4853, 8.91873),
        new Point(55.5014, 7.43767),
        new Point(53.2939, 6.37521),
        new Point(50.9484, 5.73788),
        new Point(48.5371, 5.52587),
        new Point(46.4657, 5.68835),
        new Point(44.371, 3.9305),
        new Point(42.069, 2.50324),
        new Point(39.615, 1.40187),
        new Point(37.0559, 0.621061),
        new Point(34.4295, 0.154733),
        new Point(31.773, 0),
    ]);
    const type2 = new Polygon([
        new Point(23.7819, 0),
        new Point(21.7293, 0.0930463),
        new Point(19.6918, 0.37393),
        new Point(17.6838, 0.848209),
        new Point(15.7262, 1.52432),
        new Point(13.8421, 2.41584),
        new Point(12.0658, 3.53927),
        new Point(10.546, 4.81475),
        new Point(9.2172, 6.32277),
        new Point(8.15598, 8.06529),
        new Point(7.45823, 10.0123),
        new Point(7.213, 12.0837),
        new Point(7.36708, 13.7164),
        new Point(7.8088, 15.2832),
        new Point(8.49946, 16.7404),
        new Point(6.57161, 17.8286),
        new Point(4.79245, 19.1831),
        new Point(3.20882, 20.802),
        new Point(1.8772, 22.6719),
        new Point(0.860077, 24.7641),
        new Point(0.219117, 27.0255),
        new Point(0, 29.38),
        new Point(0.21806, 31.7284),
        new Point(0.855319, 33.9838),
        new Point(1.86577, 36.07),
        new Point(3.19031, 37.9371),
        new Point(4.76622, 39.5543),
        new Point(6.44905, 40.8509),
        new Point(8.26776, 41.9072),
        new Point(10.1874, 42.7246),
        new Point(12.1791, 43.3059),
        new Point(14.2148, 43.6531),
        new Point(16.2733, 43.7685),
        new Point(18.4824, 43.6334),
        new Point(20.6646, 43.2308),
        new Point(22.7914, 42.5577),
        new Point(24.8275, 41.6113),
        new Point(26.2234, 43.2338),
        new Point(27.7981, 44.648),
        new Point(29.5229, 45.8325),
        new Point(31.3714, 46.7713),
        new Point(33.313, 47.4508),
        new Point(35.317, 47.8624),
        new Point(37.3517, 48),
        new Point(39.3176, 47.8697),
        new Point(41.256, 47.4836),
        new Point(43.1373, 46.8469),
        new Point(44.9341, 45.9676),
        new Point(46.6208, 44.8568),
        new Point(48.17, 43.5289),
        new Point(49.5586, 42.0012),
        new Point(51.4843, 42.2496),
        new Point(53.6956, 41.9346),
        new Point(55.7683, 41.0331),
        new Point(57.6137, 39.661),
        new Point(59.2031, 37.9451),
        new Point(60.5377, 35.9861),
        new Point(61.6343, 33.8576),
        new Point(62.5068, 31.6082),
        new Point(63.1709, 29.2751),
        new Point(63.6352, 26.8847),
        new Point(63.9101, 24.46),
        new Point(64, 22.0174),
        new Point(63.9101, 19.5752),
        new Point(63.6352, 17.1503),
        new Point(63.1709, 14.7601),
        new Point(62.5068, 12.427),
        new Point(61.6343, 10.1782),
        new Point(60.5388, 8.04969),
        new Point(59.2042, 6.09132),
        new Point(57.6147, 4.37446),
        new Point(55.7694, 3.00209),
        new Point(53.6956, 2.10025),
        new Point(51.4843, 1.78528),
        new Point(49.64, 2.00673),
        new Point(47.8771, 2.64487),
        new Point(46.257, 3.63564),
        new Point(44.3566, 2.97197),
        new Point(42.4225, 2.43433),
        new Point(40.4639, 2.01947),
        new Point(38.4853, 1.72469),
        new Point(36.4951, 1.54848),
        new Point(34.4995, 1.48972),
        new Point(33.2496, 1.51845),
        new Point(32.0038, 1.59302),
        new Point(30.0083, 0.885887),
        new Point(27.9588, 0.390603),
        new Point(25.8776, 0.0971828),
        new Point(23.7819, 0),
    ]);
    const type3 = new Polygon([
        new Point(45.9914, 48),
        new Point(44.0191, 47.9252),
        new Point(42.0595, 47.7004),
        new Point(40.1232, 47.3221),
        new Point(38.225, 46.7849),
        new Point(36.3827, 46.0805),
        new Point(34.4273, 46.7034),
        new Point(32.4243, 47.146),
        new Point(30.3883, 47.4109),
        new Point(28.3382, 47.4991),
        new Point(26.3628, 47.4169),
        new Point(24.4012, 47.1708),
        new Point(22.4681, 46.7597),
        new Point(20.578, 46.1817),
        new Point(18.7487, 45.4347),
        new Point(16.9984, 44.5157),
        new Point(15.3502, 43.4222),
        new Point(13.8329, 42.1551),
        new Point(12.4774, 40.7173),
        new Point(10.7886, 41.3571),
        new Point(8.99572, 41.5791),
        new Point(7.17011, 41.3493),
        new Point(5.45257, 40.6861),
        new Point(3.92617, 39.6577),
        new Point(2.63474, 38.3432),
        new Point(1.47619, 36.5952),
        new Point(0.653498, 34.6651),
        new Point(0.16287, 32.6241),
        new Point(0, 30.5308),
        new Point(0.139932, 28.5939),
        new Point(0.560007, 26.699),
        new Point(1.26428, 24.8891),
        new Point(2.25546, 23.22),
        new Point(3.53222, 21.7595),
        new Point(5.08069, 20.5901),
        new Point(5.01142, 19.4826),
        new Point(5.2355, 17.405),
        new Point(5.88363, 15.4173),
        new Point(6.89717, 13.5882),
        new Point(8.20345, 11.9542),
        new Point(9.7346, 10.5285),
        new Point(11.4362, 9.31005),
        new Point(13.2664, 8.29235),
        new Point(15.1916, 7.46779),
        new Point(17.1859, 6.82807),
        new Point(19.2288, 6.36545),
        new Point(20.4611, 4.78085),
        new Point(21.9615, 3.44577),
        new Point(23.6477, 2.35211),
        new Point(25.4603, 1.48407),
        new Point(27.359, 0.825626),
        new Point(29.3146, 0.364186),
        new Point(31.3062, 0.0907766),
        new Point(33.3128, 0),
        new Point(35.2972, 0.0883159),
        new Point(37.2658, 0.354921),
        new Point(39.2001, 0.805009),
        new Point(41.0785, 1.44671),
        new Point(42.8752, 2.29246),
        new Point(44.5498, 3.35639),
        new Point(46.0486, 4.65479),
        new Point(47.2951, 6.1977),
        new Point(49.3306, 6.56673),
        new Point(51.3283, 7.10301),
        new Point(53.2714, 7.81017),
        new Point(55.142, 8.69187),
        new Point(56.9189, 9.7515),
        new Point(58.5757, 10.9906),
        new Point(60.0815, 12.4084),
        new Point(61.4008, 14.0006),
        new Point(62.4934, 15.7574),
        new Point(63.3151, 17.6555),
        new Point(63.8259, 19.6572),
        new Point(64, 21.7173),
        new Point(63.8721, 23.4837),
        new Point(63.4946, 25.2141),
        new Point(62.8833, 26.8764),
        new Point(62.061, 28.4449),
        new Point(61.0529, 29.9031),
        new Point(62.1088, 31.256),
        new Point(62.9306, 32.7612),
        new Point(63.4591, 34.3923),
        new Point(63.6441, 36.098),
        new Point(63.3843, 38.1327),
        new Point(62.6435, 40.0483),
        new Point(61.5152, 41.7644),
        new Point(60.0983, 43.253),
        new Point(58.4738, 44.5139),
        new Point(56.8621, 45.4755),
        new Point(55.1615, 46.2681),
        new Point(53.3943, 46.9028),
        new Point(51.5814, 47.3875),
        new Point(49.7341, 47.7294),
        new Point(47.8678, 47.9326),
        new Point(45.9914, 48),
    ]);
    const types = [type1, type3];
    const poly = types[Math.round(Math.random() * types.length)];
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const speed = Math.random() * (0.6 - 0.2) + 0.2;
    const sx = Math.random() > 0.5 ? 2 : -2;
    const sy = Math.random() > 0.5 ? 2 : -2;
    const entity = new Entity();
    const transform = new Transform({
        position: new Vector(x, y),
        scale: new Vector(sx, sy),
    });
    const solid = new Solid({
        collider: poly,
        velocity: new Force({
            linear: new Vector(-speed, 0),
        }),
        isCollisionEnabled: false,
        isGravityEnabled: false,
        isStatic: true,
    });
    const colorable = new Colorable({
        layer: 10,
        shape: poly,
        backgroundColor: colorCloudFill,
    });
    entity.set(Transform.name, transform);
    entity.set(Solid.name, solid);
    entity.set(Colorable.name, colorable);
    return entity;
}
function createStar(minX, maxX, minY, maxY) {
    const poly = new Polygon([
        new Point(3.9687501, 7.9375),
        new Point(3.688117, 4.249383),
        new Point(0, 3.9687501),
        new Point(3.688117, 3.688117),
        new Point(3.9687499, 0),
        new Point(4.249383, 3.688117),
        new Point(7.9375, 3.9687499),
        new Point(4.249383, 4.249383),
    ]);
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const s = Math.random() * (6 - 2) + 2;
    const entity = new Entity();
    const transform = new Transform({
        position: new Vector(x, y),
        scale: new Vector(s, s),
    });
    const solid = new Solid({
        collider: poly,
        isCollisionEnabled: false,
        isGravityEnabled: false,
        isStatic: true,
        velocity: new Force({
            linear: new Vector(0.1, 0),
        }),
    });
    const colorable = new Colorable({
        backgroundColor: colorStarFill,
        layer: 0,
        shape: poly,
    });
    entity.set(Transform.name, transform);
    entity.set(Solid.name, solid);
    entity.set(Colorable.name, colorable);
    return entity;
}
const entities = new EntityArray();
const systems = new SystemArray();
entities.push(createPlayer(0, 0));
entities.push(createGround(-2000, -1000, 1000, 1000));
entities.push(createGround(-2000, 0, 4000, 1000));
entities.push(createGround(2000, -100, 1000, 1000));
entities.push(createGround(3200, -100, 3000, 1000));
entities.push(createGround(6700, -100, 3000, 1000));
for (let i = 0; i < 50; i++) {
    entities.push(createCloud(-2000, 9700, -500, -300));
}
for (let i = 0; i < 300; i++) {
    entities.push(createStar(-2000, 9700, -700, 0));
}
systems.push(new Movement());
systems.push(new Physics());
const app = new App(entities, systems);
