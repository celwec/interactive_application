function createCloud(minX: number, maxX: number, minY: number, maxY: number): Entity {
	const type1: Polygon = new Polygon([
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
	const type2: Polygon = new Polygon([
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
	const type3: Polygon = new Polygon([
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

	const types: Polygon[] = [type1, type3];
	const poly: Polygon = types[Math.round(Math.random() * types.length)];
	const x: number = Math.random() * (maxX - minX) + minX;
	const y: number = Math.random() * (maxY - minY) + minY;
	const speed: number = Math.random() * (0.6 - 0.2) + 0.2;
	const sx: number = Math.random() > 0.5 ? 2 : -2;
	const sy: number = Math.random() > 0.5 ? 2 : -2;


	const entity: Entity = new Entity();

	const transform: Transform = new Transform({
		position: new Vector(x, y),
		scale: new Vector(sx, sy),
	});
	
	const solid: Solid = new Solid({
		collider: poly,
		velocity: new Force({
			linear: new Vector(-speed, 0),
		}),
		isCollisionEnabled: false,
		isGravityEnabled: false,
		isStatic: true,
	});
	
	const colorable: Colorable = new Colorable({
		layer: 10,
		shape: poly,
		backgroundColor: colorCloudFill,
	});

	entity.set(Transform.name, transform);
	entity.set(Solid.name, solid);
	entity.set(Colorable.name, colorable);

	return entity;
}