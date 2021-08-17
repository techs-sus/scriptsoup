declare const owner: Player;

print("forc v1 compliant with comradio Protocol v3");

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
function Tags(name: string, verified: boolean, nickname?: string) {
	const tag = Format(
		// eslint-disable-next-line roblox-ts/lua-truthiness
		`[${verified ? "✔️" : "❌"}]${nickname ? "[" + nickname + "]" : ""}[${name}]: `,
		ComputeNameColor(`[${name}]: `),
	);
	return tag;
}

interface comradioProtocol {
	author: {
		nickname?: string;
		id: number;
		token?: number;
	};
	sentTime: number;
	type: string;
	content:
		| string
		| {
				id?: number;
				comment?: string;
				text?: string;
				type: string;
		  };
	token?: number;
}

function PrintToScreen(text: string) {
	print(text);
}

const MessagingService = game.GetService("MessagingService");
const HttpService = game.GetService("HttpService");
const Players = game.GetService("Players");

print("Please enter your nickname.");
const nick = owner.Chatted.Wait();
print("> " + nick);

const tokens: { [id: number]: number } = {};

function CheckIfVerified(message: comradioProtocol) {
	const token = tokens[message.author.id];
	if (token !== undefined) {
		if (message.author.token === (token ^ message.author.id ^ message.sentTime)) {
			return true;
		}
	}
	return false;
}

let channel = "hub";
let connection: RBXScriptConnection;
function Connect(name: string) {
	if (connection) {
		print("Disconnecting...");
		connection.Disconnect();
	}
	print("Connecting to comradio3." + channel + "...");
	connection = MessagingService.SubscribeAsync("comradio3." + channel, (data, sent) => {
		const decoded: comradioProtocol = HttpService.JSONDecode(data as string);

		if (math.abs(os.time() - decoded.sentTime) > 30) {
			return; // message expired
		}

		const authorName = Players.GetNameFromUserIdAsync(decoded.author.id);
		const verified = CheckIfVerified(decoded);
		switch (decoded.type) {
			case "verify":
				if (decoded.token !== undefined) {
					tokens[decoded.author.id] = decoded.token;
				}
				// eslint-disable-next-line roblox-ts/lua-truthiness
				PrintToScreen(`(${authorName}) ${decoded.author.nickname || authorName} has joined the channel.`);
				break;
			case "text":
				PrintToScreen(Tags(authorName, verified, decoded.author.nickname));
		}
	});
}

export {};
