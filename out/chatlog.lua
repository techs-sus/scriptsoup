-- Compiled with roblox-ts v1.1.1
local players = game:GetService("Players")
local function log(player)
	local username = player.Name
	player.Chatted:Connect(function(message)
		print("@" .. username .. ">", message)
	end)
end
local _0 = players:GetPlayers()
local _1 = log
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
players.PlayerAdded:Connect(log)
return nil
