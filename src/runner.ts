let owner: Player;
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

owner!.Chatted.Connect((message: string) => {
	const command = message.split("'");
	if (command[0] === "r") {
		const source: string = get("/out/" + command[1] + ".lua");
		// eslint-disable-next-line roblox-ts/lua-truthiness
		if (source) {
			NS(source, script);
		} else {
			warn("Invalid script name!");
		}
	} else if (command[0] === "c") {
		NS(command[1], script);
	} else if (command[0] === "v") {
		const source: string = get(command[1]);
		print(source);
	}
});

export {};
