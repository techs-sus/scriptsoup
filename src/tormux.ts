declare const owner: Player;
declare const loadstring: (source: string) => Function;
declare const NLS: (source: string, parent: Instance) => undefined;
declare const setfenv: (func: Function, env: unknown) => undefined;

type widgetify = () => TextBox;

const http = game.GetService("HttpService");
const screen = loadstring(
	http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"),
)() as Part;
screen.Parent = script;
screen.CFrame = (owner.Character!.FindFirstChild("Head") as Part).CFrame.mul(new CFrame(0, 0, -5));
const UI = screen.FindFirstChild("SurfaceGui")!.FindFirstChild("Frame")!;
const out = UI.FindFirstChild("output")!;
const widgets = UI.FindFirstChild("widgets")!;

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
const logTemplate = out.FindFirstChild("help")!;
const widgetTemplate = widgets.FindFirstChild("1")!;
const availableWidgets = {
	time: () => {
		const widget = widgetTemplate.Clone() as TextBox;
		coroutine.wrap(() => {
			while (true) {
				widget.Text = os.date("%H:%M");
				wait(60);
			}
		})();
		return widget;
	},
	quote: () => {
		const widget = widgetTemplate.Clone() as TextBox;
		coroutine.wrap(() => {
			while (true) {
				widget.Text = http.GetAsync("http://api.quotable.io/random");
				wait(35);
			}
		})();
		return widget;
	},
};
function log(text: string) {
	const box = logTemplate.Clone() as TextBox;
	box.Name = tostring(os.clock());
	box.Text = text;
	box.Parent = out;
}
const env = getfenv(0) as { [type: string]: unknown };
const terminalLib = {
	log: log,
	help: () => {
		log("terminal.log ( text: string ) -> void / log to output");
		log("terminal.help () -> void / show help");
		log("terminal.setWidget ( num: string, widget: Widget ) -> void / set widget");
		log("terminal.widgets -> Widget[] / list of widgets");
	},
	widgets: availableWidgets,
	setWidget: (num: string, widget: widgetify) => {
		widgets.FindFirstChild(num)?.Destroy();
		const newWidget = widget();
		newWidget.Name = num;
		newWidget.Parent = widgets;
	},
};
env.terminal = terminalLib;
remote.OnServerEvent.Connect((player: Player, mode: unknown, meta: unknown) => {
	print(player, mode, meta);
	if (mode === "exec") {
		log("~ " + meta);
		const run = loadstring(meta as string);
		setfenv(run, env);
		run();
	} else if (mode === "init") {
		out.FindFirstChild("welcome")!.Destroy();
		widgets.FindFirstChild("2")!.Destroy();
		logTemplate.Parent = undefined;
		widgetTemplate.Parent = undefined;
		log("Welcome to Tormux");
		log("Enter terminal.help() for help");
		terminalLib.setWidget("1", availableWidgets.quote);
		terminalLib.setWidget("2", availableWidgets.time);
	}
});

export {};
