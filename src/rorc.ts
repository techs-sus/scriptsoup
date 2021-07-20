declare const owner: Player;
declare const table: unknown;

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
	Type: "text" | "image" | "welcome" | "sound" | "status" | "ping" | "encrypted" | "diffieHellmanExchange";
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
function DEC_HEX(IN: number) {
	const B = 16;
	const K = "0123456789ABCDEF";
	let OUT = "";
	let I = 0;
	let D = 0;
	while (IN > 0) {
		I += 1;
		IN = math.floor(IN / B);
		D = (IN % B) + 1;
		OUT = string.sub(K, D, D) + OUT;
	}
	return OUT;
}
function encode(input: string) {
	const encoded: number[] = [];
	for (let i = 1; i <= input.size(); i++) {
		const c = input.sub(i, i);
		encoded.push(c.byte()[0]);
	}
	return encoded;
}
function xorEncrypt(input: number[], password: number[]) {
	const encryptedArray = input.map((byte, index) => {
		const dec = bit32.bxor(byte, password[index % password.size()]);
		return DEC_HEX(dec);
	});
	return encryptedArray.join(" ");
}
function xorDecrypt(input: string, password: number[]) {
	let decrypted = "";
	input.split(" ").forEach((byte: string, index: number) => {
		const dec = tonumber(byte, 16)!;
		const unlocked = bit32.bxor(dec, password[index % password.size()]);
		decrypted += string.char(unlocked);
	});
	return decrypted;
}
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
	messagetype: "text" | "image" | "welcome" | "sound" | "status" | "ping" | "encrypted" | "diffieHellmanExchange",
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

const keys: { [id: number]: number } = {};
const exchanges: { [id: number]: { [variable: string]: number } } = {};
const privateKey = math.random(1000000, 9999999);

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
			switch (messagetype) {
				case "image":
					print("image: " + request.Content);
					const image = new Instance("ImageLabel");
					image.Size = UDim2.fromOffset(300, 300);
					image.Position = new UDim2(0, 5, 0, 25);
					image.ScaleType = Enum.ScaleType.Fit;
					image.Image = request.Content;
					image.Parent = box;
					break;
				case "sound":
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
					break;
				case "ping":
					const pingTarget: Player = players.GetPlayerByUserId(tonumber(request.Content)!) as Player;
					if (pingTarget) {
						box.BackgroundTransparency = 0.8;
						box.BackgroundColor3 = new Color3(1, 0.8, 0.13);
						box.Text += " @" + pingTarget.Name;
					}
					break;
				case "diffieHellmanExchange":
					const target: number = tonumber(comment.split(";")[1])!;
					if (target === owner.UserId) {
						switch (comment.split(";")[0]) {
							case "1a": // bob
								exchanges[request.Author] = {};
								exchanges[request.Author].p = tonumber(request.Content.split(";")[0])!;
								exchanges[request.Author].g = tonumber(request.Content.split(";")[1])!;
								box.Destroy();
								const B = (exchanges[request.Author].g ^ privateKey) % exchanges[request.Author].p;
								send(
									request.Content + ";" + B,
									"diffieHellmanExchange",
									owner.UserId,
									"1b;" + request.Author,
								);
								break;
							case "1b": // alice
								exchanges[request.Author] = {};
								exchanges[request.Author].p = tonumber(request.Content.split(";")[0])!;
								exchanges[request.Author].g = tonumber(request.Content.split(";")[1])!;
								exchanges[request.Author].B = tonumber(request.Content.split(";")[2])!;
								box.Destroy();
								const A = (exchanges[request.Author].g ^ privateKey) % exchanges[request.Author].p;
								send(tostring(A), "diffieHellmanExchange", owner.UserId, "2a;" + request.Author);
								break;
							case "2a": // bob
								exchanges[request.Author].A = tonumber(request.Content)!;
								exchanges[request.Author].s =
									(exchanges[request.Author].A ^ privateKey) % exchanges[request.Author].p;
								send("confirmed", "diffieHellmanExchange", owner.UserId, "3;" + request.Author);
								box.Destroy();
								break;
							case "2b": // alice
								exchanges[request.Author].s =
									(exchanges[request.Author].B ^ privateKey) % exchanges[request.Author].p;
								send("confirmed", "diffieHellmanExchange", owner.UserId, "3;" + request.Author);
								box.Destroy();
								break;
							case "3": // bob
								box.Text += "[KEYS CONFIFRMED] You can now send encrypted messages to " + author;
								keys[request.Author] = exchanges[request.Author].s;
								break;
						}
					}
					break;
				case "private":
					const messageTarget: number = tonumber(request.Content)!;
					if (messageTarget === owner.UserId) {
						// eslint-disable-next-line roblox-ts/lua-truthiness
						if (keys[request.Author]) {
							box.Text += "[ENCRYPTED] " + xorDecrypt(comment, encode(tostring(keys[request.Author])));
						} else {
							box.Text =
								"[ERROR]: Received private message from " +
								author +
								", but no keys are available to decrypt.";
						}
					}
					break;
				default:
					box.Text += "[UNKNOWN MESSAGE TYPE]";
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
			const split: string[] = command.sub(8, -1).split(" ");
			const id: string = split[0];
			split.shift();
			const comment = split.join(" ");
			send(id, "image", player.UserId, comment);
		} else if (command.sub(1, 7) === "/sound ") {
			const split: string[] = command.sub(8, -1).split(" ");
			const id: string = split[0];
			split.shift();
			const comment = split.join(" ");
			send(id, "sound", player.UserId, comment);
		} else if (command.sub(1, 7) === "/rchelp") {
			output("--------------------- help ------------------------");
			output("/send [message] - send a text message");
			output("/image rbxassetid://[id] [comment] - send an image");
			output("/sound rbxassetid://[id] [comment] - send a sound");
			output("/status [status] - change your status");
			output("/ping [name] [comment] - ping someone");
			output("/list - see known channels");
			output("/switch [name] - switch to another channel");
			output("/keys [name] - confirm keys with someone");
			output("/private [name] [msg] - send a private message to someone [requires keys]");
			output("---------------------------------------------------");
		} else if (command.sub(1, 8) === "/switch ") {
			channel = command.sub(9, -1);
			output("switching to " + channel);
			subscribe(channel);
			send("", "welcome", owner.UserId, "");
		} else if (command.sub(1, 8) === "/status ") {
			const status = command.sub(9, -1);
			send("", "status", player.UserId, status);
		} else if (command.sub(1, 6) === "/ping ") {
			const split: string[] = command.sub(7, -1).split(" ");
			const name: string = split[0];
			split.shift();
			const comment = split.join(" ");
			const id = players.GetUserIdFromNameAsync(name);
			send(tostring(id), "ping", player.UserId, comment);
		} else if (command.sub(1, 5) === "/list") {
			output("------- list -------");
			output("");
			output("coop");
			output("memes");
			output("scripting");
			output("feedback");
			output("questions");
			output("townhall");
			output("news");
			output("--------------------");
		} else if (command.sub(1, 6) === "/keys ") {
			const split: string[] = command.sub(7, -1).split(" ");
			const name: string = split[0];
			split.shift();
			const comment = split.join(";");
			const id = players.GetUserIdFromNameAsync(name);
			send(comment, "diffieHellmanExchange", player.UserId, tostring(id));
		} else if (command.sub(1, 9) === "/private ") {
			const split: string[] = command.sub(7, -1).split(" ");
			const name: string = split[0];
			split.shift();
			const comment = split.join(" ");
			const id = players.GetUserIdFromNameAsync(name);
			send(tostring(id), "encrypted", player.UserId, comment);
		}
	});
});

export {};
