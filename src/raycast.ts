const camera = new Instance("Part");
camera.CFrame = new CFrame(20, 10, 15);
camera.Size = new Vector3(0.5, 0.5, 0.5);
camera.Anchored = true;
camera.Parent = script;

const pointlights: PointLight[] = [];
game.Workspace.GetDescendants().forEach((light: Instance) => {
	if (light.IsA("PointLight")) {
		pointlights.push(light as PointLight);
	}
});

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
					raycast(result.Position.add(normal.Unit.mul(0.05)), normal),
					result.Instance.Transparency,
				);
			}
			/* was very ugly
			if (game.Workspace.Raycast(result.Position, new Vector3(0.5, 0.1, 0).mul(100))) {
				color = color.Lerp(new Color3(0, 0, 0), 1 - result.Instance.Transparency);
			}
			*/
			pointlights.forEach((light: PointLight) => {
				let Brightness = distFromPoint((light.Parent as BasePart).Position, result.Position) / light.Range;
				Brightness = 1 - Brightness;
				Brightness = math.clamp(Brightness, 0, 1);
				color = color.Lerp(light.Color, math.clamp((light.Brightness / 120) * Brightness, 0, 0.9));
			});
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
	return diffr < 0.02 && diffg < 0.02 && diffb < 0.02;
}
function distFromPoint(center: Vector3, point: Vector3) {
	return point.sub(center).Magnitude;
}

const pixels: BasePart[][] = [];
for (let x = -100; x < 100; x++) {
	pixels[x] = [];
	for (let y = -100; y < 100; y++) {
		if (y % 16 === 0) {
			wait(1 / 40);
		}

		const pixel = new Instance("WedgePart");
		pixel.Size = new Vector3(1, 1, 1).mul(0.05);
		pixel.Anchored = true;
		pixel.Position = new Vector3(x / 20 + 20, y / 20 + 10, 20);
		pixels[x][y] = pixel;

		const cf = new CFrame(20, 10, 15).mul(CFrame.Angles(y / 200, x / 200, 0));
		const normal = cf.LookVector.mul(100);
		const origin = cf.Position;
		const color = raycast(origin, normal);
		if (x > -100) {
			const prevPixel = pixels[x - 1][y];
			if (eqColor(prevPixel.Color, color)) {
				pixels[x][y] = prevPixel;
				prevPixel.Position = prevPixel.Position.add(new Vector3(0.025, 0, 0));
				prevPixel.Size = prevPixel.Size.add(new Vector3(0.05, 0, 0));
				pixel.Destroy();
				continue;
			}
		}
		pixel.Color = color;
		pixel.Parent = script;
	}
}

pixels.forEach((xArray, x) => {

})

export {};
