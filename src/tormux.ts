declare const owner: Player;
declare const loadstring: (source: string) => Function;
declare const NLS: (source: string, parent: Instance) => undefined;
declare const setfenv: (func: Function, env: unknown) => undefined;

const http = game.GetService("HttpService");
const screen = loadstring(
	http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"),
)() as Part;
screen.Parent = script;
screen.CFrame = (owner.Character!.FindFirstChild("Head") as Part).CFrame.mul(new CFrame(0, 0, -5));
const UI = screen.FindFirstChild("SurfaceGui")!.FindFirstChild("Frame")!;
const out = UI.FindFirstChild("output")!;

const remote = new Instance("RemoteEvent", owner.FindFirstChild("PlayerGui")!);
const ref = new Instance("ObjectValue", remote);
ref.Name = "ref";
ref.Value = screen;
NLS(
	`
		local rem = script.Parent
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
		print('out')
		table.foreach(out:GetChildren(), print)
		local log = out:WaitForChild("help")
		print('hel')
		out:WaitForChild("welcome"):Destroy()
		print('des')
		log.Parent = nil
		print('go')

		go.MouseButton1Click:Connect(function()
			local text = box.Text
			print(text)
			box.Text = ""
			rem:FireServer("exec", text)
		end)
		rem:FireServer("init")
	`,
	remote,
);
const template = out.FindFirstChild("help")!;
function log(text: string) {
	const box = template.Clone() as TextBox;
	box.Name = tostring(os.clock());
	box.Text = text;
	box.Parent = out;
}
remote.OnServerEvent.Connect((player: Player, mode: unknown, meta: unknown) => {
	print(player, mode, meta);
	if (mode === "exec") {
		log("~ " + meta);
		const run = loadstring(meta as string);
		const env = getfenv(0) as { [type: string]: unknown };
		env.terminal = {
			log: log,
			help: () => {
				log("terminal.log ( text: string ) -> void / log to output");
				log("terminal.help () -> void / show help");
			},
		};
		setfenv(run, env);
		run();
	} else if (mode === "init") {
		out.FindFirstChild("welcome")!.Destroy();
		template.Parent = undefined;
		log("Welcome to Tormux");
		log("Enter terminal.help() for help");
	}
});

export {};
