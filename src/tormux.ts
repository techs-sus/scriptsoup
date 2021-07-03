declare const owner: Player;
declare const loadstring: (source: string) => Function;
declare const NLS: (source: string, parent: Instance) => undefined;

const http = game.GetService("HttpService");
const screen = loadstring(
	http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"),
)() as Instance;
screen.Parent = game.GetService("Workspace");
const UI = screen.FindFirstChild("SurfaceGui")!.FindFirstChild("Frame")!;

const remote = new Instance("RemoteEvent", owner.FindFirstChild("PlayerGui")!);
const ref = new Instance("ObjectValue", remote);
ref.Name = "ref";
ref.Value = UI;
NLS(
	`

	`,
	remote,
);

export {};
