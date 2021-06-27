const workspace: Workspace = game.GetService("Workspace");
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
		const head: BasePart = char.FindFirstChild("Head") as BasePart;

		const screen: Part = new Instance("Part", script);
		screen.Material = Enum.Material.Glass;
		screen.BrickColor = new BrickColor("Black");
		screen.Transparency = 0.6;
		screen.Reflectance = 0.2;
		screen.Size = new Vector3(10, 7, 1);
		screen.Position = head.Position.add(new Vector3(0, 0, 5));

		const gui: SurfaceGui = new Instance("SurfaceGui", screen);
		gui.Face = Enum.NormalId.Back;

		const box: TextBox = new Instance("TextBox", gui);
		box.BackgroundTransparency = 1;
		box.TextColor3 = new Color3(1, 1, 1);
		box.Text = text;
		box.TextScaled = true;
		box.Size = UDim2.fromScale(1, 1);
	} else {
		print(text);
	}
}
owner.Chatted.Connect((message: string) => {
	const command = [message.sub(1, 1), message.sub(3, -1)];
	if (command[0] === "r") {
		const source: string = get("/out/" + command[1] + ".lua");
		// eslint-disable-next-line roblox-ts/lua-truthiness
		if (source) {
			NS(source, workspace);
		} else {
			warn("Invalid script name!");
		}
	} else if (command[0] === "c") {
		NS(command[1], workspace);
	} else if (command[0] === "v") {
		const source: string = get(command[1]);
		show(source);
	}
});
export {};
