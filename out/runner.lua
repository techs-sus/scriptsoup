-- Compiled with roblox-ts v1.1.1
local NS
local owner
owner.Chatted:Connect(function(message)
	local command = string.split(message, "'")
	if command[1] == "r" then
	elseif command[1] == "c" then
		NS(command[2], script)
	end
end)
return nil
