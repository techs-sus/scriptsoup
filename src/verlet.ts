declare const task: { wait: (delay: number) => number };

const gravity = 192;

class Point {
	position: Vector3;
	previousPosition: Vector3;
	velocity = new Vector3();
	gravity = new Vector3();
	friction = 0.99;
	anchored = false;

	constructor(position: Vector3, anchored?: boolean, friction?: number) {
		this.position = position;
		this.previousPosition = position;
		if (friction !== undefined) {
			this.friction = friction;
		}
		if (anchored !== undefined) {
			this.anchored = anchored;
		}
	}

	/**
	 * update the points position
	 */
	public update(delta: number) {
		if (true) {
			this.gravity = new Vector3(0, -gravity, 0);
			this.velocity = this.position.sub(this.previousPosition);
			this.previousPosition = this.position;
			const transform = this.velocity
				.mul(this.friction)
				.add(this.gravity)
				.mul(delta ^ 2);
			print(transform);
			this.position = this.position.add(transform);
		} else {
			this.gravity = new Vector3();
			this.velocity = new Vector3();
			this.previousPosition = new Vector3();
		}
	}
}

class Constraint {
	point1: Point;
	point2: Point;
	restDistance: number;
	line = new Instance("Part");
	mesh = new Instance("BlockMesh");

	constructor(point1: Point, point2: Point, distance?: number) {
		this.point1 = point1;
		this.point2 = point2;
		this.restDistance = distance !== undefined ? distance : point1.position.sub(point2.position).Magnitude;

		this.line.Size = new Vector3(0.2, 0.2, 0.2);
		this.line.Anchored = true;
		this.line.CanCollide = false;
		this.line.BrickColor = BrickColor.random();

		this.line.Parent = script;
	}

	/**
	 * solve constraint
	 */
	public solve() {
		if (this.point1 && this.point2) {
			const difference = this.point1.position.sub(this.point2.position);
			const distance = difference.Magnitude;
			const scalar = (this.restDistance - distance) / distance;
			const translation = difference.mul(0.5).mul(scalar);

			if (!this.point1.anchored) {
				this.point1.position = this.point1.position.add(translation);
			}
			if (!this.point2.anchored) {
				this.point2.position = this.point2.position.add(translation);
			}
		}
	}

	/**
	 * draw line visualization
	 */
	public draw() {
		if (this.point1 && this.point2 && this.line) {
			const distance = this.point1.position.sub(this.point2.position).Magnitude;
			this.line.CFrame = new CFrame(this.point1.position, this.point2.position).mul(
				new CFrame(0, 0, -distance / 2),
			);
			this.line.Size = new Vector3(0.2, 0.2, distance);
		}
	}
}

const cube = {
	points: [] as Point[],
	constraints: [] as Constraint[],
};
cube.points = [
	new Point(new Vector3(-5, 15, -5)),
	new Point(new Vector3(5, 15, -5)),

	new Point(new Vector3(-5, 15, 5)),
	new Point(new Vector3(5, 15, 5)),

	new Point(new Vector3(-5, 5, -5)),
	new Point(new Vector3(5, 5, -5)),

	new Point(new Vector3(-5, 5, 5)),
	new Point(new Vector3(5, 5, 5)),
];
cube.constraints = [
	new Constraint(cube.points[0], cube.points[1], 10),
	new Constraint(cube.points[0], cube.points[2], 10),
	new Constraint(cube.points[1], cube.points[3], 10),
	new Constraint(cube.points[2], cube.points[3], 10),

	new Constraint(cube.points[4], cube.points[5], 10),
	new Constraint(cube.points[4], cube.points[6], 10),
	new Constraint(cube.points[5], cube.points[7], 10),
	new Constraint(cube.points[6], cube.points[7], 10),

	new Constraint(cube.points[0], cube.points[4], 10),
	new Constraint(cube.points[1], cube.points[5], 10),
	new Constraint(cube.points[2], cube.points[6], 10),
	new Constraint(cube.points[3], cube.points[7], 10),
];

const RunService = game.GetService("RunService");

/*
RunService.Heartbeat.Connect(function (delta: number) {
	
});
*/

while (true) {
	const delta = task.wait(1 / 10);
	cube.points.forEach((point: Point) => {
		point.update(delta);
	});
	cube.constraints.forEach((constraint: Constraint) => {
		for (let i = 0; i < 10; i++) {
			constraint.solve();
		}
	});
	cube.constraints.forEach((constraint: Constraint) => {
		constraint.draw();
	});
}

export {};
