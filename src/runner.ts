import { HttpService } from "@rbxts/services";

let NS: (source: string, parent: Instance) => void;
let owner: Player;

owner!.Chatted.Connect((message: string) => {
	const command = message.split("'");
	if (command[0] === "r") {

	} else if (command[0] === "c") {
		NS!(command[1], script);
	}
})

export {};