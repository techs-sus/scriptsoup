let NS: (source: string, parent: Instance) => void;
let owner!: Player;
const http = game.GetService("HttpService");

owner.Chatted.Connect((message: string) => {
	const command = message.split("'");
	if (command[0] === "r") {
		const source: string = http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/out/" + command[1] + ".lua");
		if (source) {
			NS(source, script);
		} else {
			warn("Invalid script name!");
		}
	} else if (command[0] === "c") {
		NS(command[1], script);
	} else if (command[0] === "v") {
		const source: string = http.GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/" + command[1]);
		print(source);
	}
})

export {};