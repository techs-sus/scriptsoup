-- Compiled with roblox-ts v1.1.1
local workspace = game:GetService("Workspace")
local API = "https://raw.githubusercontent.com/snoo8/scriptsoup/main"
local defaultHeaders = {
	["Cache-Control"] = "no-cache",
}
local http = game:GetService("HttpService")
local commands = {
	size = function(args)
		local char = owner.Character
		if not char then
			warn("no character")
			return nil
		end
		local hum = char:FindFirstChild("Humanoid")
		if not hum then
			warn("no humanoid")
			return nil
		end
		if hum.RigType ~= Enum.HumanoidRigType.R15 then
			warn("not r15")
			return nil
		end
		local width = hum:FindFirstChild("BodyWidthScale")
		local heigth = hum:FindFirstChild("BodyHeightScale")
		local depth = hum:FindFirstChild("BodyDepthScale")
		local head = hum:FindFirstChild("HeadScale")
		local scale = tonumber(args[2])
		width.Value = scale
		heigth.Value = scale
		depth.Value = scale
		head.Value = scale
		return nil
	end,
}
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
		if not head then
			return nil
		end
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
		local split = string.split(command[2], "'")
		local _0 = command[1]
		repeat
			local _1 = false
			if _0 == ("r") then
				local requested = get("/out/" .. command[2] .. ".lua")
				local _2 = requested
				local _3 = typeof(_2) == "string"
				if _3 then
					_3 = requested ~= ""
				end
				if _3 then
					NS(requested, script)
				else
					warn("Invalid script name!")
				end
				break
			end
			if _0 == ("q") then
				NS(command[2], script)
				break
			end
			if _0 == ("v") then
				local source = get(command[2])
				show(source)
				break
			end
			if _0 == ("c") then
				script:ClearAllChildren()
				break
			end
			if _0 == ("a") then
				local targetCommand = commands[split[1]]
				if targetCommand == nil then
					warn("invalid command")
					return nil
				end
				targetCommand(split)
				break
			end
			if _0 == ("e") then
				print(loadstring("return " .. command[2])())
			end
		until true
	end
end)
return nil
