declare const owner: Player;

const char: Model = owner.Character!;
const head: BasePart | undefined = char.FindFirstChild("Head") as BasePart;

interface subscribeCallback {
	Data: unknown;
	Sent: unknown;
}

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

const layout: UIListLayout = new Instance("UIListLayout", scroller);
layout.HorizontalAlignment = Enum.HorizontalAlignment.Left;
layout.VerticalAlignment = Enum.VerticalAlignment.Top;
layout.SortOrder = Enum.SortOrder.Name;

function output(text: string) {
	const box: TextBox = new Instance("TextBox", scroller);
	box.BackgroundTransparency = 1;
	box.TextColor3 = new Color3(1, 1, 1);
	box.Text = text;
	box.TextSize = 15;
	box.TextWrapped = true;
	box.AutomaticSize = Enum.AutomaticSize.XY;
	box.TextXAlignment = Enum.TextXAlignment.Left;
	box.TextYAlignment = Enum.TextYAlignment.Top;
	box.Name = tostring(os.clock());

	if (scroller.GetChildren().size() > 30) {
		let oldest: TextBox;
		scroller.GetChildren().forEach((element: Instance) => {
			if (element.IsA("TextBox")) {
				if (!oldest) {
					oldest = element;
				} else if (tonumber(oldest!.Name)! > tonumber(element.Name)!) {
					oldest = element;
				}
			}
		});
		oldest!.Destroy();
	}
}

const ms: MessagingService = game.GetService("MessagingService");
const chat: Chat = game.GetService("Chat");
ms.SubscribeAsync("comradio", (message: unknown) => {
	output((message as subscribeCallback).Data as string);
});
ms.PublishAsync("comradio", `Welcome, ${owner.Name}! Say "/send [message]" to send a message to the channel.`);

owner.Chatted.Connect((command: string) => {
	if (command.sub(1, 6) === "/send ") {
		const message: string = `[${owner.Name}]: ` + chat.FilterStringForBroadcast(command.sub(7, -1), owner);
		ms.PublishAsync("comradio", message);
	}
});

export {};
