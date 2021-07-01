-- Compiled with roblox-ts v1.1.1
local ms = game:GetService("MessagingService")
local text = game:GetService("TextService")
local players = game:GetService("Players")
local http = game:GetService("HttpService")
local char = owner.Character
local head = char:FindFirstChild("Head")
local channel = ""
local NAME_COLORS = { Color3.new(), Color3.new(1 / 255, 162 / 255, 255 / 255), Color3.new(2 / 255, 184 / 255, 87 / 255), BrickColor.new("Bright violet").Color, BrickColor.new("Bright orange").Color, BrickColor.new("Bright yellow").Color, BrickColor.new("Light reddish violet").Color, BrickColor.new("Brick yellow").Color }
local function GetNameValue(pName)
	local value = 0
	do
		local _0 = 1
		while _0 < #pName do
			local index = _0
			local cValue = { string.byte(string.sub(pName, index, index)) }
			local reverseIndex = #pName - index + 1
			if #pName % 2 == 1 then
				reverseIndex = reverseIndex - 1
			end
			if reverseIndex % 4 >= 2 then
				cValue[1] = -cValue[1]
			end
			value += cValue[1]
			_0 = index
			_0 += 1
		end
	end
	return value
end
local function ComputeNameColor(pName)
	return NAME_COLORS[GetNameValue(pName) % #NAME_COLORS + 1]
end
local function ExtractRGB(color)
	local r = math.floor(color.R * 255)
	local g = math.floor(color.G * 255)
	local b = math.floor(color.B * 255)
	return { r, g, b }
end
local function Format(text, color)
	local rgb = ExtractRGB(color)
	return '<font color="rgb(' .. tostring(rgb[1]) .. ", " .. tostring(rgb[2]) .. ", " .. tostring(rgb[3]) .. ')">' .. text .. "</font>"
end
local function Tags(name)
	local tag = Format("[" .. name .. "]: ", ComputeNameColor(name))
	return tag
end
local screen = Instance.new("Part", script)
screen.Material = Enum.Material.Glass
screen.BrickColor = BrickColor.new("Black")
screen.Transparency = 0.6
screen.Reflectance = 0.2
screen.Size = Vector3.new(10, 7, 1)
local _0 = head.CFrame
local _1 = Vector3.new(0, 0, -5)
screen.CFrame = _0 + _1
screen.Anchored = true
local gui = Instance.new("SurfaceGui", screen)
gui.Face = Enum.NormalId.Back
local scroller = Instance.new("ScrollingFrame", gui)
scroller.BackgroundTransparency = 1
scroller.Size = UDim2.fromScale(1, 1)
scroller.CanvasSize = UDim2.fromScale(1, 6)
local layout = Instance.new("UIListLayout", scroller)
layout.HorizontalAlignment = Enum.HorizontalAlignment.Left
layout.VerticalAlignment = Enum.VerticalAlignment.Top
layout.SortOrder = Enum.SortOrder.Name
local function output(text)
	local box = Instance.new("TextBox", scroller)
	box.BackgroundTransparency = 1
	box.TextColor3 = Color3.new(1, 1, 1)
	box.Text = text
	box.Font = Enum.Font.SourceSans
	box.TextSize = 25
	box.RichText = true
	box.TextWrapped = true
	box.AutomaticSize = Enum.AutomaticSize.XY
	box.TextXAlignment = Enum.TextXAlignment.Left
	box.TextYAlignment = Enum.TextYAlignment.Top
	box.Name = tostring(os.clock())
	box.ClipsDescendants = false
	if #scroller:GetChildren() > 25 then
		local oldest
		local _2 = scroller:GetChildren()
		local _3 = function(element)
			if element:IsA("TextBox") then
				if not oldest then
					oldest = element
				elseif tonumber(oldest.Name) > tonumber(element.Name) then
					oldest = element
				end
			end
		end
		-- ▼ ReadonlyArray.forEach ▼
		for _4, _5 in ipairs(_2) do
			_3(_5, _4 - 1, _2)
		end
		-- ▲ ReadonlyArray.forEach ▲
		oldest:Destroy()
	end
	return box
end
local function send(message, messagetype, author, comment)
	print("sending message as " .. tostring(author))
	local request = {
		Author = author,
		Content = message,
		Type = messagetype,
		Comment = comment,
	}
	ms:PublishAsync("comradio:" .. channel, http:JSONEncode(request))
end
local subscription
local function subscribe(name)
	local _2 = subscription
	if _2 ~= nil then
		_2:Disconnect()
	end
	subscription = ms:SubscribeAsync("comradio:" .. name, function(message)
		local request = http:JSONDecode(message.Data)
		print("received message from " .. tostring(request.Author))
		print("type: " .. request.Type)
		local author = game:GetService("Players"):GetNameFromUserIdAsync(request.Author)
		local messagetype = request.Type
		local tag = Tags(author)
		print(tag)
		if messagetype == "text" then
			local content = text:FilterStringAsync(request.Content, owner.UserId):GetChatForUserAsync(owner.UserId)
			local box = output(tag .. content)
		elseif messagetype == "welcome" then
			local box = output("Welcome, " .. author .. '! Say "/rchelp" in the chat for a list of commands.')
		else
			local comment = text:FilterStringAsync(request.Comment, owner.UserId):GetChatForUserAsync(owner.UserId)
			local box = output(tag .. comment)
			if messagetype == "image" then
				print("image: " .. request.Content)
				local image = Instance.new("ImageLabel")
				image.Size = UDim2.fromOffset(300, 300)
				image.Position = UDim2.new(0, 5, 0, 25)
				image.ScaleType = Enum.ScaleType.Fit
				image.Image = request.Content
				image.Parent = box
			elseif messagetype == "sound" then
				print("sound: " .. request.Content)
				local button = Instance.new("TextButton")
				button.Size = UDim2.fromOffset(50, 50)
				button.Position = UDim2.new(0, 5, 0, 25)
				button.TextScaled = true
				button.BackgroundColor3 = Color3.new(0.1, 0.51, 0.98)
				button.Text = "▶"
				button.Parent = box
				local sound = Instance.new("Sound")
				sound.SoundId = request.Content
				sound.Volume = 1
				sound.Looped = true
				sound.Parent = box
				local playing = false
				button.MouseButton1Click:Connect(function()
					playing = not playing
					if playing then
						sound:Play()
						button.Text = "⏸"
					else
						sound:Pause()
						button.Text = "▶"
					end
				end)
			end
		end
	end)
end
subscribe("")
send("", "welcome", owner.UserId, "")
output("Using rorc v6 compliant with comradio Protocol v2")
local _2 = players:GetPlayers()
local _3 = function(player)
	player.Chatted:Connect(function(command)
		if string.sub(command, 1, 6) == "/send " then
			send(string.sub(command, 7, -1), "text", player.UserId, "")
		elseif string.sub(command, 1, 7) == "/image " then
			local split = string.split(string.sub(command, 8, -1), " ")
			-- eslint-disable-next-line roblox-ts/lua-truthiness
			local _4 = split[1]
			local _5 = player.UserId
			local _6 = split[2]
			if not (_6 ~= "" and _6) then
				_6 = ""
			end
			send(_4, "image", _5, _6)
		elseif string.sub(command, 1, 7) == "/sound " then
			local split = string.split(string.sub(command, 8, -1), " ")
			-- eslint-disable-next-line roblox-ts/lua-truthiness
			local _4 = split[1]
			local _5 = player.UserId
			local _6 = split[2]
			if not (_6 ~= "" and _6) then
				_6 = ""
			end
			send(_4, "sound", _5, _6)
		elseif string.sub(command, 1, 7) == "/rchelp" then
			output("--------------------- help ------------------------")
			output("/send [message] - send a text message")
			output("/image rbxassetid://[id] [comment] - send an image")
			output("/sound rbxassetid://[id] [comment] - send a sound")
			output("/switch [name] - switch to another channel")
			output("---------------------------------------------------")
		elseif string.sub(command, 1, 8) == "/switch " then
			channel = string.sub(command, 9, -1)
			subscribe(channel)
			send("", "welcome", owner.UserId, "")
		end
	end)
end
-- ▼ ReadonlyArray.forEach ▼
for _4, _5 in ipairs(_2) do
	_3(_5, _4 - 1, _2)
end
-- ▲ ReadonlyArray.forEach ▲
return nil
