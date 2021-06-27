export {};

const chat = game.GetService("Chat");
chat.BubbleChatEnabled = true;

function bubblechat(player: Player) {
	player.Chatted.Connect((message) => {
		if (player.Character) {
			const filtered: string = chat.FilterStringForBroadcast(message, player);
			if (message.match("/[etw]")[0] === undefined) {
				chat.Chat(player.Character, filtered);
			}
		}
	});
}

const players = game.GetService("Players");
players.GetPlayers().forEach((player) => {
	bubblechat(player);
});
players.PlayerAdded.Connect(bubblechat);
