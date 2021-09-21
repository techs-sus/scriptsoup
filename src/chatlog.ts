// Log the chat to output                                 //
const players: Players = game.GetService("Players");

function log(player: Player) {
	const username: string = player.Name;
	player.Chatted.Connect((message: string) => {
		print("@" + username + ">", message);
	});
}

players.GetPlayers().forEach(log);
players.PlayerAdded.Connect(log);

export {};
