declare const owner: Player;
declare const NLS: (source: string, parent: Instance) => undefined;

const tweenService: TweenService = game.GetService("TweenService");
const debris: Debris = game.GetService("Debris");

const sword: Tool = new Instance("Tool");
sword.Name = "sword";
sword.Grip = new CFrame(0, 0, 2);

const handle: Part = new Instance("Part");
handle.Name = "Handle";
handle.Color = Color3.fromRGB(102, 0, 102);
const tweenInfo: TweenInfo = new TweenInfo(2, Enum.EasingStyle.Circular, Enum.EasingDirection.InOut, -1, true);
const tween = tweenService.Create(handle, tweenInfo, {
	Color: Color3.fromRGB(204, 0, 153),
});
tween.Play();
handle.Size = new Vector3(1, 1, 3);
handle.Parent = sword;

sword.Parent = owner.FindFirstChild("Backpack") as Backpack;

const remote: RemoteEvent = new Instance("RemoteEvent", sword);
NLS(
	`
		local rem = script.Parent;
		local mouse = owner:GetMouse();

		mouse.Button1Down:Connect(function()
			rem:FireServer('down', mouse.UnitRay.Direction, mouse.UnitRay.Origin);
		end)
		mouse.Button1Up:Connect(function()
			rem:FireServer('up');
		end)
	`,
	remote,
);
let charging = false;
let charge = 0;
remote.OnServerEvent.Connect((plr, mode, direction, origin) => {
	if (plr !== owner) {
		return;
	}
	switch (mode) {
		case "down":
			charging = true;
			while (charging) {
				wait(1 / 10);
				charge += 1;
				const ex = new Instance("Explosion");
				ex.DestroyJointRadiusPercent = 0;
				ex.ExplosionType = Enum.ExplosionType.NoCraters;
				ex.Position = handle.Position;
				ex.Parent = handle.Parent;
				debris.AddItem(ex, 1);
			}
			const ex = new Instance("Explosion");
			ex.Position = handle.Position;
			ex.BlastPressure = charging * 1000;
			ex.Parent = handle.Parent;
			debris.AddItem(ex, 1);
		case "up":
			charging = false;
	}
});

export {};
