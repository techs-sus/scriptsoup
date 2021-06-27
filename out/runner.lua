-- Compiled with roblox-ts v1.1.1
local workspace = game:GetService("Workspace")
local owner = owner
local NS = NS
local API = "https://raw.githubusercontent.com/snoo8/scriptsoup/main"
local defaultHeaders = {
	["Cache-Control"] = "no-cache",
}
local http = game:GetService("HttpService")
local function get(endpoint)
	local url = API .. endpoint
	local response = http:RequestAsync({
		Url = url,
		Method = "GET",
		Headers = defaultHeaders,
	})
	if not response.Success then
		warn("HTTP GET request failure:", url, response.StatusCode, response.StatusMessage)
	end
	return response.Body
end
owner.Chatted:Connect(function(message)
	local command = string.split(message, "'")
	if command[1] == "r" then
		local source = get("/out/" .. command[2] .. ".lua")
		-- eslint-disable-next-line roblox-ts/lua-truthiness
		if source ~= "" and source then
			NS(source, workspace)
		else
			warn("Invalid script name!")
		end
	elseif command[1] == "c" then
		NS(command[2], workspace)
	elseif command[1] == "v" then
		local source = get(command[2])
		print(source)
	end
end)
return nil
