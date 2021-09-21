// Loader that lets you quickly run scripts from this repo  
declare const owner: Player;
declare const NS: (source: string, parent: Instance) => undefined;
declare const loadstring: (source: string) => Function;

type command = (args: string[]) => undefined;

const workspace: Workspace = game.GetService("Workspace");
const API = "https://raw.githubusercontent.com/snoo8/scriptsoup/main";
const defaultHeaders = {
	"Cache-Control": "no-cache",
};
const http = game.GetService("HttpService");
const commands: { [type: string]: command } = {
	size: (args: string[]) => {
		const char: Model = owner.Character as Model;
		if (!char) {
			warn("no character");
			return;
		}
		const hum: Humanoid = char.FindFirstChild("Humanoid") as Humanoid;
		if (!hum) {
			warn("no humanoid");
			return;
		}
		if (hum.RigType !== Enum.HumanoidRigType.R15) {
			warn("not r15");
			return;
		}
		const width: NumberValue = hum.FindFirstChild("BodyWidthScale") as NumberValue;
		const heigth: NumberValue = hum.FindFirstChild("BodyHeightScale") as NumberValue;
		const depth: NumberValue = hum.FindFirstChild("BodyDepthScale") as NumberValue;
		const head: NumberValue = hum.FindFirstChild("HeadScale") as NumberValue;
		const scale: number = tonumber(args[1]) as number;
		width.Value = scale;
		heigth.Value = scale;
		depth.Value = scale;
		head.Value = scale;
		return undefined;
	},
	ws: (args: string[]) => {
		const char: Model = owner.Character as Model;
		if (!char) {
			warn("no character");
			return;
		}
		const hum: Humanoid = char.FindFirstChild("Humanoid") as Humanoid;
		if (!hum) {
			warn("no humanoid");
			return;
		}
		hum.WalkSpeed = tonumber(args[1])!;
		return undefined;
	},
	jp: (args: string[]) => {
		const char: Model = owner.Character as Model;
		if (!char) {
			warn("no character");
			return;
		}
		const hum: Humanoid = char.FindFirstChild("Humanoid") as Humanoid;
		if (!hum) {
			warn("no humanoid");
			return;
		}
		hum.JumpPower = tonumber(args[1])!;
		return undefined;
	},
	dn: (args: string[]) => {
		const char: Model = owner.Character as Model;
		if (!char) {
			warn("no character");
			return;
		}
		const hum: Humanoid = char.FindFirstChild("Humanoid") as Humanoid;
		if (!hum) {
			warn("no humanoid");
			return;
		}
		hum.DisplayName = args[1];
		return undefined;
	},
};
function get(endpoint: string): string {
	const url = API + endpoint;
	const response = http.RequestAsync({
		Url: url,
		Method: "GET",
		Headers: defaultHeaders,
	});
	if (!response.Success) {
		warn("HTTP GET request failure:", url, response.StatusCode, response.StatusMessage);
	}
	return response.Body;
}
function show(text: string) {
	if (owner.Character) {
		const char: Model = owner.Character!;
		const head: BasePart | undefined = char.FindFirstChild("Head") as BasePart;
		if (!head) return;

		const screen: Part = new Instance("Part", script);
		screen.Material = Enum.Material.Glass;
		screen.BrickColor = new BrickColor("Black");
		screen.Transparency = 0.6;
		screen.Reflectance = 0.2;
		screen.Size = new Vector3(10, 7, 1);
		screen.CFrame = head.CFrame.add(new Vector3(0, 0, 5));
		screen.Anchored = true;

		const gui: SurfaceGui = new Instance("SurfaceGui", screen);
		gui.Face = Enum.NormalId.Back;

		const scroller: ScrollingFrame = new Instance("ScrollingFrame", gui);
		scroller.BackgroundTransparency = 1;
		scroller.Size = UDim2.fromScale(1, 1);
		scroller.CanvasSize = UDim2.fromScale(1, 6);

		const box: TextBox = new Instance("TextBox", scroller);
		box.BackgroundTransparency = 1;
		box.TextColor3 = new Color3(1, 1, 1);
		box.Text = text;
		box.TextSize = 15;
		box.TextWrapped = true;
		box.Size = UDim2.fromScale(1, 1);
		box.TextXAlignment = Enum.TextXAlignment.Left;
		box.TextYAlignment = Enum.TextYAlignment.Top;
	} else {
		print(text);
	}
}

const forceField = new Instance("Part");
forceField.Shape = Enum.PartType.Ball;
forceField.Size = new Vector3(8, 8, 8);
forceField.Material = Enum.Material.ForceField;
forceField.BrickColor = BrickColor.Black();
//forceField.CanCollide = false;
forceField.Massless = true;
let forceFieldWeld = new Instance("Weld");
forceFieldWeld.Part0 = owner.Character!.FindFirstChild("HumanoidRootPart") as BasePart;
forceFieldWeld.Part1 = forceField;
forceFieldWeld.Parent = forceField;

let forceFieldEnabled = false;
let forceFieldMode = "d";
forceField.Touched.Connect((part: BasePart) => {
	if (!part.IsDescendantOf(owner.Character!)) {
		print(forceFieldMode);
		switch (forceFieldMode) {
			case "d":
				if (!part.Anchored) {
					part.Destroy();
				}
				break;
			case "r":
				part.ApplyImpulse(part.Position.sub(forceField.Position).mul(50));
				break;
			case "x":
				new Instance("ForceField", owner.Character!);
				new Instance("Explosion", part).Position = part.Position;
				break;
		}
	}
});

owner.Chatted.Connect((message: string) => {
	if (message.sub(2, 2) === "'") {
		const command = [message.sub(1, 1), message.sub(3, -1)];
		const split: string[] = command[1].split("'");
		switch (command[0]) {
			case "r":
				const requested: string = get("/out/" + command[1] + ".lua");
				if (typeOf(requested) === "string" && requested !== "") {
					NS(requested, script);
				} else {
					warn("Invalid script name!");
				}
				break;
			case "q":
				NS(command[1], script);
				break;
			case "v":
				const source: string = get(command[1]);
				show(source);
				break;
			case "c":
				script.ClearAllChildren();
				break;
			case "a":
				const targetCommand: command = commands[split[0]] as command;
				if (targetCommand === undefined) {
					warn("invalid command");
					return;
				}
				targetCommand(split);
				break;
			case "e":
				print(loadstring("return " + command[1])());
			case "f":
				const params = command[1].split("'");
				switch (params[0]) {
					case "t":
						forceFieldEnabled = !forceFieldEnabled;
						if (forceFieldEnabled) {
							forceField.Parent = script;
						} else {
							forceField.Parent = undefined;
						}
						break;
					case "m":
						print("set", params[1]);
						forceFieldMode = params[1];
						switch (forceFieldMode) {
							case "d":
								forceField.BrickColor = BrickColor.Black();
								break;
							case "r":
								forceField.BrickColor = BrickColor.Blue();
								break;
							case "x":
								forceField.BrickColor = BrickColor.Red();
								break;
						}
						break;
					case "fw":
						forceFieldWeld = new Instance("Weld");
						forceFieldWeld.Part0 = owner.Character!.FindFirstChild("HumanoidRootPart") as BasePart;
						forceFieldWeld.Part1 = forceField;
						forceFieldWeld.Parent = forceField;
						break;
				}
				break;
		}
	}
});
export {};
