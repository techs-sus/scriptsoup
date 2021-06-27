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
local function show(text)
	if owner.Character then
		local char = owner.Character
		local head = char:FindFirstChild("Head")
		local screen = Instance.new("Part", script)
		screen.Material = Enum.Material.Glass
		screen.BrickColor = BrickColor.new("Black")
		screen.Transparency = 0.6
		screen.Reflectance = 0.2
		screen.Size = Vector3.new(10, 7, 1)
		local _0 = head.CFrame
		local _1 = Vector3.new(0, 0, 5)
		screen.CFrame = _0 + _1
		screen.Anchored = true
		local gui = Instance.new("SurfaceGui", screen)
		gui.Face = Enum.NormalId.Back
		local scroller = Instance.new("ScrollingFrame", gui)
		scroller.BackgroundTransparency = 1
		scroller.Size = UDim2.fromScale(1, 1)
		scroller.CanvasSize = UDim2.fromScale(1, 6)
		local box = Instance.new("TextBox", scroller)
		box.BackgroundTransparency = 1
		box.TextColor3 = Color3.new(1, 1, 1)
		box.Text = text
		box.TextSize = 15
		box.TextWrapped = true
		box.Size = UDim2.fromScale(1, 1)
		box.TextXAlignment = Enum.TextXAlignment.Left
		box.TextYAlignment = Enum.TextYAlignment.Top
	else
		print(text)
	end
end
owner.Chatted:Connect(function(message)
	if string.sub(message, 2, 2) == "'" then
		local command = { string.sub(message, 1, 1), string.sub(message, 3, -1) }
		if command[1] == "r" then
			local source = get("/out/" .. command[2] .. ".lua")
			-- eslint-disable-next-line roblox-ts/lua-truthiness
			if source ~= "" and source then
				NS(source, script)
			else
				warn("Invalid script name!")
			end
		elseif command[1] == "c" then
			NS(command[2], script)
		elseif command[1] == "v" then
			local source = get(command[2])
			show(source)
		elseif command[1] == "q" then
			script:ClearAllChildren()
		end
	end
end)
return nil
