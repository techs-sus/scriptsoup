const workspace: Workspace = game.GetService("Workspace");
// very funky hack to make roblox-ts not complain
let owner!: Player;
let NS: (source: string, parent: Instance) => undefined;
const API = "https://raw.githubusercontent.com/snoo8/scriptsoup/main";
const defaultHeaders = {
	"Cache-Control": "no-cache",
};
const http = game.GetService("HttpService");
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
owner.Chatted.Connect((message: string) => {
	if (message.sub(2, 2) === "'") {
		const command = [message.sub(1, 1), message.sub(3, -1)];
		if (command[0] === "r") {
			const source: string = get("/out/" + command[1] + ".lua");
			if (typeOf(source) === "string" && source !== "") {
				NS(source, script);
			} else {
				warn("Invalid script name!");
			}
		} else if (command[0] === "c") {
			NS(command[1], script);
		} else if (command[0] === "v") {
			const source: string = get(command[1]);
			show(source);
		} else if (command[0] === "q") {
			script.ClearAllChildren();
		}
	}
});
export {};
