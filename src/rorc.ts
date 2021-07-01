declare const owner: Player;

const ms: MessagingService = game.GetService("MessagingService");
const text: TextService = game.GetService("TextService");
const players: Players = game.GetService("Players");
const http: HttpService = game.GetService("HttpService");

const char: Model = owner.Character!;
const head: BasePart | undefined = char.FindFirstChild("Head") as BasePart;

let channel = "";

interface subscribeCallback {
	Data: string;
	Sent: unknown;
}

interface comradioProtocol {
	Type: "text" | "image" | "welcome" | "sound" | "status";
	Content: string;
	Comment: string;
	Author: number;
}

const NAME_COLORS = [
	new Color3(), // new BrickColor("Bright red").Color,
	new Color3(1 / 255, 162 / 255, 255 / 255), // new BrickColor("Bright blue").Color,
	new Color3(2 / 255, 184 / 255, 87 / 255), // new BrickColor("Earth green").Color,
	new BrickColor("Bright violet").Color,
	new BrickColor("Bright orange").Color,
	new BrickColor("Bright yellow").Color,
	new BrickColor("Light reddish violet").Color,
	new BrickColor("Brick yellow").Color,
];
function GetNameValue(pName: string) {
	let value = 0;
	for (let index = 1; index < pName.size(); index++) {
		const cValue = string.byte(string.sub(pName, index, index));
		let reverseIndex = pName.size() - index + 1;
		if (pName.size() % 2 === 1) {
			reverseIndex = reverseIndex - 1;
		}
		if (reverseIndex % 4 >= 2) {
			cValue[0] = -cValue[0];
		}
		value += cValue[0];
	}
	return value;
}
function ComputeNameColor(pName: string) {
	return NAME_COLORS[GetNameValue(pName) % NAME_COLORS.size()];
}
function ExtractRGB(color: Color3) {
	const r: number = math.floor(color.R * 255);
	const g: number = math.floor(color.G * 255);
	const b: number = math.floor(color.B * 255);
	return [r, g, b];
}
function Format(text: string, color: Color3) {
	const rgb = ExtractRGB(color);
	return `<font color="rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})">${text}</font>`;
}
function Tags(name: string) {
	const tag = Format(`[${name}]: `, ComputeNameColor(name));
	return tag;
}

const screen: Part = new Instance("Part", script);
screen.Material = Enum.Material.Glass;
screen.BrickColor = new BrickColor("Black");
screen.Transparency = 0.6;
screen.Reflectance = 0.2;
screen.Size = new Vector3(10, 7, 1);
screen.CFrame = head.CFrame.add(new Vector3(0, 0, -5));
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
	box.Font = Enum.Font.SourceSans;
	box.TextSize = 25;
	box.RichText = true;
	box.TextWrapped = true;
	box.AutomaticSize = Enum.AutomaticSize.XY;
	box.TextXAlignment = Enum.TextXAlignment.Left;
	box.TextYAlignment = Enum.TextYAlignment.Top;
	box.Name = tostring(os.clock());
	box.ClipsDescendants = false;

	if (scroller.GetChildren().size() > 25) {
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

	return box;
}
function send(
	message: string,
	messagetype: "text" | "image" | "welcome" | "sound" | "status",
	author: number,
	comment: string,
) {
	print("sending message as " + author);
	const request: comradioProtocol = {
		Author: author,
		Content: message,
		Type: messagetype,
		Comment: comment,
	};
	ms.PublishAsync("comradio:" + channel, http.JSONEncode(request));
}

let subscription: RBXScriptConnection;
function subscribe(name: string) {
	subscription?.Disconnect();
	subscription = ms.SubscribeAsync("comradio:" + name, (message: unknown) => {
		const request: comradioProtocol = http.JSONDecode(
			(message as subscribeCallback).Data as string,
		) as comradioProtocol;
		print("received message from " + request.Author);
		print("type: " + request.Type);
		const author: string = game.GetService("Players").GetNameFromUserIdAsync(request.Author)!;
		const messagetype: string = request.Type;
		const tag: string = Tags(author);
		print(tag);
		if (messagetype === "text") {
			const content = text.FilterStringAsync(request.Content, owner.UserId)!.GetChatForUserAsync(owner.UserId);
			const box = output(tag + content);
		} else if (messagetype === "welcome") {
			const box = output(`Welcome, ${author}! Say "/rchelp" in the chat for a list of commands.`);
		} else if (messagetype === "status") {
			const comment = text.FilterStringAsync(request.Comment!, owner.UserId)!.GetChatForUserAsync(owner.UserId);
			const box = output(`${author}s new status is ${comment}`);
		} else {
			const comment = text.FilterStringAsync(request.Comment!, owner.UserId)!.GetChatForUserAsync(owner.UserId);
			const box = output(tag + comment);
			if (messagetype === "image") {
				print("image: " + request.Content);
				const image = new Instance("ImageLabel");
				image.Size = UDim2.fromOffset(300, 300);
				image.Position = new UDim2(0, 5, 0, 25);
				image.ScaleType = Enum.ScaleType.Fit;
				image.Image = request.Content;
				image.Parent = box;
			} else if (messagetype === "sound") {
				print("sound: " + request.Content);
				const button = new Instance("TextButton");
				button.Size = UDim2.fromOffset(50, 50);
				button.Position = new UDim2(0, 5, 0, 25);
				button.TextScaled = true;
				button.BackgroundColor3 = new Color3(0.1, 0.51, 0.98);
				button.Text = "▶";
				button.Parent = box;
				const sound = new Instance("Sound");
				sound.SoundId = request.Content;
				sound.Volume = 1;
				sound.Looped = true;
				sound.Parent = box;
				let playing = false;
				button.MouseButton1Click.Connect(() => {
					playing = !playing;
					if (playing) {
						sound.Play();
						button.Text = "⏸";
					} else {
						sound.Pause();
						button.Text = "▶";
					}
				});
			}
		}
	});
}
subscribe("");

send("", "welcome", owner.UserId, "");
output("Using rorc v6 compliant with comradio Protocol v2");

players.GetPlayers().forEach((player: Player) => {
	player.Chatted.Connect((command: string) => {
		if (command.sub(1, 6) === "/send ") {
			send(command.sub(7, -1), "text", player.UserId, "");
		} else if (command.sub(1, 7) === "/image ") {
			const split = command.sub(8, -1).split(" ");
			// eslint-disable-next-line roblox-ts/lua-truthiness
			send(split[0], "image", player.UserId, split[1] || "");
		} else if (command.sub(1, 7) === "/sound ") {
			const split = command.sub(8, -1).split(" ");
			// eslint-disable-next-line roblox-ts/lua-truthiness
			send(split[0], "sound", player.UserId, split[1] || "");
		} else if (command.sub(1, 7) === "/rchelp") {
			output("--------------------- help ------------------------");
			output("/send [message] - send a text message");
			output("/image rbxassetid://[id] [comment] - send an image");
			output("/sound rbxassetid://[id] [comment] - send a sound");
			output("/switch [name] - switch to another channel");
			output("/status [status] - change your status");
			output("---------------------------------------------------");
		} else if (command.sub(1, 8) === "/switch ") {
			channel = command.sub(9, -1);
			subscribe(channel);
			send("", "welcome", owner.UserId, "");
		} else if (command.sub(1, 8) === "/status ") {
			const status = command.sub(9, -1);
			send("", "status", owner.UserId, status);
		}
	});
});

export {};
