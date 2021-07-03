declare const owner: Player;
declare const loadstring: (source: string) => Function;
declare const NLS: (source: string, parent: Instance) => undefined;

const http = game.GetService("HttpService");
const screen = loadstring(
	http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"),
)() as Part;
screen.Parent = script;
screen.CFrame = (owner.Character!.FindFirstChild("Head") as Part).CFrame.mul(new CFrame(0, 0, -5));
const UI = screen.FindFirstChild("SurfaceGui")!.FindFirstChild("Frame")!;
const out = UI.FindFirstChild("output")!;
const template = out.FindFirstChild("1")!;
out.FindFirstChild("0")!.Destroy();
template.Parent = undefined;

const remote = new Instance("RemoteEvent", owner.FindFirstChild("PlayerGui")!);
const remoteBack = new Instance("RemoteEvent", remote);
remoteBack.Name = "remback";
const ref = new Instance("ObjectValue", remote);
ref.Name = "ref";
ref.Value = screen;
NLS(
	`
		local rem = script.Parent
		local remback = rem:WaitForChild("remback")
		local ref = rem:WaitForChild("ref")
		local screen = ref.Value
		script.Parent = rem.Parent
		rem.Parent = script
		ref.Parent = script

		local gui = screen:WaitForChild("SurfaceGui")
		gui.Parent = script
		gui.Adornee = screen

		local UI = gui:WaitForChild("Frame")
		local box = UI:WaitForChild("input")
		local go = box:WaitForChild("go")
		local out = UI:WaitForChild("output")
		local log = out:WaitForChild("help")
		out:WaitForChild("welcome"):Destroy()
		log.Parent = nil

		go.MouseButton1Click:Connect(function()
			local text = box.Text
			print(text)
			box.Text = ""
			rem:FireServer("exec", text)
		end)
		remback.OnClientEvent:Connect(function(text)
			local new = log:Clone()
			new.Name = os.clock()
			new.Text = text
			new.Parent = out
		end)
	`,
	remote,
);
remote.OnServerEvent.Connect((player: Player, mode: unknown, meta: unknown) => {
	print(player, mode, meta);
	remoteBack.FireClient(owner, "~ " + meta);
	const box = template.Clone() as TextBox;
	box.Name = tostring(os.clock());
	box.Text = "~ " + meta;
});

export {};
