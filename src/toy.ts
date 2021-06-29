declare const owner: Player;
const char: Model = owner.Character! as Model;
const hum: Humanoid = char.FindFirstChild("Humanoid") as Humanoid;
const torso: BasePart = (char.FindFirstChild("Torso") || char.FindFirstChild("UpperTorso")) as BasePart;
const players: Players = game.GetService("Players");

const tool: Tool = new Instance("Tool");
tool.Name = owner.DisplayName;
owner.Character!.Parent = tool;
const handle: Part = new Instance("Part");
handle.Name = "Handle";
handle.Transparency = 1;
handle.Parent = tool;
const weld: Weld = new Instance("Weld");
weld.Part0 = handle;
weld.Part1 = torso;
weld.Parent = handle;

tool.Equipped.Connect(() => {
	hum.Sit = true;
});
handle.Touched.Connect((part: BasePart) => {
	const hum: Humanoid = part.Parent?.FindFirstChild("Humanoid") as Humanoid;
	if (hum) {
		tool.Parent = players.GetPlayerFromCharacter(part.Parent)?.FindFirstChild("Backpack") || tool.Parent;
	}
});

tool.Parent = game.GetService("Workspace");

export {};
