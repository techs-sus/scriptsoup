const http = game.GetService("HttpService");

interface gameData {
	id: number;
	rootPlaceId: number;
	name: string;
	description: string | undefined;
	creator: {
		id: number;
		name: string;
		type: "User" | "Group";
	};
	allowedGearGenres: Array<string>;
	allowedGearCategoris: Array<string>;
	playing: number;
	visits: number;
	maxPlayers: number;
	created: string;
	updated: string;
	studioAccessToApisAllowed: boolean;
	createVipServersAllowed: boolean;
	universeAvatarType: string;
	genre: string;
	gameRating: number | undefined;
	isFavoritedByUser: boolean;
}

interface badge {
	badge: string;
	check: (player: Player) => boolean;
}

function getVisits(id: number) {
	const games: Array<number> = http.JSONDecode(
		http.GetAsync("https://games.rprxy.xyz/v2/users/" + id + "/games?accessFilter=Public&sortOrder=Asc&limit=100"),
	);
	let visits = 0;
	games.forEach((id: number) => {
		const gameData: { data: Array<gameData> } = http.JSONDecode(
			http.GetAsync("https://games.rprxy.xyz/v1/games?universeIds=" + id),
		);
		const data = gameData.data;
		const visitData: gameData = data[0];
		visits += visitData.visits;
	});
	return visits;
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
	{
		badge: "🔨",
		check: (player: Player) => {
			return getVisits(player.UserId) > 2500;
		},
	},
];

function addBadges(player: Player) {
	player.CharacterAdded.Connect((char: Model) => {
		const hum: Humanoid = char.FindFirstChild("Humanoid")! as Humanoid;
		badges.forEach((badge: badge) => {
			hum.DisplayName = (badge.check(player) ? badge.badge : "") + hum.DisplayName;
		});
	});
}

const players: Players = game.GetService("Players");
players.GetPlayers().forEach(addBadges);
players.PlayerAdded.Connect(addBadges);

export {};
