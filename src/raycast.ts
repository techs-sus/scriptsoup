function raycast(origin: Vector3, normal: Vector3): Color3 {
	const result = game.Workspace.Raycast(origin, normal);
	if (result) {
		if (result.Instance !== game.Workspace.Terrain) {
			let color = result.Instance.Color;
			if (result.Instance.Reflectance > 0) {
				const reflectedNormal = normal.sub(result.Normal.mul(normal.Dot(result.Normal) * 2)).mul(100);
				color = color.Lerp(raycast(result.Position, reflectedNormal), result.Instance.Reflectance);
			}
			if (result.Instance.Transparency > 0) {
				color = color.Lerp(
					raycast(result.Position.add(normal.Unit.mul(result.Instance.Size)), normal),
					result.Instance.Transparency,
				);
			}
			if (game.Workspace.Raycast(result.Position, new Vector3(0.5, 0.1, 0).mul(100))) {
				color = color.Lerp(new Color3(0, 0, 0), 1 - result.Instance.Transparency);
			}
			return color;
		} else {
			return game.Workspace.Terrain.GetMaterialColor(result.Material);
		}
	}
	return Color3.fromRGB(69, 217, 255);
}
function eqColor(a: Color3, b: Color3): boolean {
	const diffr = math.abs(a.R - b.R);
	const diffg = math.abs(a.G - b.G);
	const diffb = math.abs(a.B - b.B);
	return diffr < 0.1 && diffg < 0.1 && diffb < 0.1;
}

const pixels: BasePart[][] = [];
for (let x = -50; x < 50; x++) {
	pixels[x] = [];
	for (let y = -50; y < 50; y++) {
		if (y % 16 === 0) {
			wait(1 / 10);
		}

		const pixel = new Instance("WedgePart");
		pixel.Size = new Vector3(1, 1, 1).mul(0.1);
		pixel.Anchored = true;
		pixel.Position = new Vector3(x / 10 + 20, y / 10 + 10, 20);
		pixels[x][y] = pixel;

		const cf = new CFrame(20, 10, 15).mul(CFrame.Angles(y / 100, x / 100, 0));
		const normal = cf.LookVector.mul(100);
		const origin = cf.Position;
		const color = raycast(origin, normal);
		if (x > -50) {
			const prevPixel = pixels[x - 1][y];
			if (eqColor(prevPixel.Color, color)) {
				pixels[x][y] = prevPixel;
				prevPixel.Position = prevPixel.Position.add(new Vector3(0.05, 0, 0));
				prevPixel.Size = prevPixel.Size.add(new Vector3(0.1, 0, 0));
				pixel.Destroy();
				continue;
			}
		}
		pixel.Color = color;
		pixel.Parent = script;
	}
}

export {};
