-- Compiled with roblox-ts v1.1.1
local http = game:GetService("HttpService")
local function getVisits(id)
	local games = http:JSONDecode(http:GetAsync("https://games.rprxy.xyz/v2/users/" .. tostring(id) .. "/games?accessFilter=Public&sortOrder=Asc&limit=100"))
	local visits = 0
	local _0 = games
	local _1 = function(id)
		local gameData = http:JSONDecode(http:GetAsync("https://games.rprxy.xyz/v1/games?universeIds=" .. tostring(id)))
		local data = gameData.data
		local visitData = data[1]
		visits += visitData.visits
	end
	-- ▼ ReadonlyArray.forEach ▼
	for _2, _3 in ipairs(_0) do
		_1(_3, _2 - 1, _0)
	end
	-- ▲ ReadonlyArray.forEach ▲
	return visits
end
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
}, {
	badge = "🔨",
	check = function(player)
		return getVisits(player.UserId) > 2500
	end,
} }
local function addBadges(player)
	player.CharacterAdded:Connect(function(char)
		local hum = char:FindFirstChild("Humanoid")
		local _0 = badges
		local _1 = function(badge)
			hum.DisplayName = (badge.check(player) and badge.badge or "") .. hum.DisplayName
		end
		-- ▼ ReadonlyArray.forEach ▼
		for _2, _3 in ipairs(_0) do
			_1(_3, _2 - 1, _0)
		end
		-- ▲ ReadonlyArray.forEach ▲
	end)
end
local players = game:GetService("Players")
local _0 = players:GetPlayers()
local _1 = addBadges
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
players.PlayerAdded:Connect(addBadges)
return nil
