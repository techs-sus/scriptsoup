-- Compiled with roblox-ts v1.1.1
local NS
local owner
local http = game:GetService("HttpService")
owner.Chatted:Connect(function(message)
	local command = string.split(message, "'")
	if command[1] == "r" then
		local source = http:GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/out/" .. command[2] .. ".lua")
		if source ~= "" and source then
			NS(source, script)
		else
			warn("Invalid script name!")
		end
	elseif command[1] == "c" then
		NS(command[2], script)
	elseif command[1] == "v" then
		local source = http:GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/" .. command[2])
		print(source)
	end
end)
return nil
