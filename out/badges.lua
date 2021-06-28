-- Compiled with roblox-ts v1.1.1
local http = game:GetService("HttpService")
local badges = { {
	badge = "🍰",
	check = function(player)
		return player.AccountAge % 365 == 0
	end,
}, {
	badge = "🧱",
	check = function(player)
		return player.AccountAge >= 365
	end,
} }
local function addBadges(character, player)
	local humanoid = character:FindFirstChild("Humanoid")
	if not humanoid then
		return nil
	end
	local _0 = badges
	local _1 = function(badge)
		humanoid.DisplayName = (badge.check(player) and badge.badge or "") .. humanoid.DisplayName
	end
	-- ▼ ReadonlyArray.forEach ▼
	for _2, _3 in ipairs(_0) do
		_1(_3, _2 - 1, _0)
	end
	-- ▲ ReadonlyArray.forEach ▲
end
local function onCharacter(player)
	player.CharacterAdded:Connect(function(char)
		addBadges(char, player)
	end)
	local _0
	if player.Character then
		_0 = addBadges(player.Character, player)
	else
		_0 = warn("no character")
	end
end
local players = game:GetService("Players")
local _0 = players:GetPlayers()
local _1 = onCharacter
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
players.PlayerAdded:Connect(onCharacter)
return nil
