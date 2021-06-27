-- Compiled with roblox-ts v1.1.1
local chat = game:GetService("Chat")
chat.BubbleChatEnabled = true
local function bubblechat(player)
	player.Chatted:Connect(function(message)
		if player.Character then
			local filtered = chat:FilterStringForBroadcast(message, player)
			if (string.match(message, "/[etw]")) == nil then
				chat:Chat(player.Character, filtered)
			end
		end
	end)
end
local players = game:GetService("Players")
local _0 = players:GetPlayers()
local _1 = function(player)
	bubblechat(player)
end
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
players.PlayerAdded:Connect(bubblechat)
return nil
