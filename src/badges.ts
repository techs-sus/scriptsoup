const http = game.GetService("HttpService");

interface badge {
	badge: string;
	check: (player: Player) => boolean;
}

const badges = [
	{
		badge: "🍰",
		check: (player: Player) => {
			return player.AccountAge % 365 === 0;
		},
	},
	{
		badge: "🧱",
		check: (player: Player) => {
			return player.AccountAge >= 365;
		},
	},
	/* it was being very wonky and unstable
	{
		badge: "🔨",
		check: (player: Player) => {
			return getVisits(player.UserId) > 2500;
		},
	},
	*/
	{
		badge: "✔",
		check: (player: Player) => {
			return player.GetRankInGroup(3256759) > 1;
		},
	},
];

function addBadges(character: Model, player: Player) {
	const humanoid: Humanoid = character.FindFirstChild("Humanoid")! as Humanoid;
	if (!humanoid) {
		return;
	}
	badges.forEach((badge: badge) => {
		humanoid.DisplayName = (badge.check(player) ? badge.badge : "") + humanoid.DisplayName;
	});
}

function onCharacter(player: Player) {
	player.CharacterAdded.Connect((char: Model) => {
		addBadges(char, player);
	});
	player.Character ? addBadges(player.Character, player) : warn("no character");
}

const players: Players = game.GetService("Players");
players.GetPlayers().forEach(onCharacter);
players.PlayerAdded.Connect(onCharacter);

export {};
