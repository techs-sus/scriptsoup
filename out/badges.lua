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
local badges = {
	["🍰"] = function(player)
		return player.AccountAge % 365 == 0
	end,
	["🧱"] = function(player)
		return player.AccountAge >= 365
	end,
	["🔨"] = function(player)
		return getVisits(player.UserId) > 2500
	end,
}
return nil
