-- Compiled with roblox-ts v1.1.1
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
local layout = Instance.new("UIListLayout", scroller)
layout.HorizontalAlignment = Enum.HorizontalAlignment.Left
layout.VerticalAlignment = Enum.VerticalAlignment.Top
layout.SortOrder = Enum.SortOrder.Name
local function output(text)
	local box = Instance.new("TextBox", scroller)
	box.BackgroundTransparency = 1
	box.TextColor3 = Color3.new(1, 1, 1)
	box.Text = text
	box.TextSize = 15
	box.TextWrapped = true
	box.AutomaticSize = Enum.AutomaticSize.XY
	box.TextXAlignment = Enum.TextXAlignment.Left
	box.TextYAlignment = Enum.TextYAlignment.Top
	box.Name = tostring(os.clock())
	if #scroller:GetChildren() > 30 then
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
end
local ms = game:GetService("MessagingService")
local chat = game:GetService("Chat")
ms:SubscribeAsync("comradio", function(message)
	output(message.Data)
end)
ms:PublishAsync("comradio", "Welcome, " .. owner.Name .. '! Say "/send [message]" to send a message to the channel.')
owner.Chatted:Connect(function(command)
	if string.sub(command, 1, 6) == "/send " then
		local message = "[" .. owner.Name .. "]: " .. chat:FilterStringForBroadcast(string.sub(command, 7, -1), owner)
		ms:PublishAsync("comradio", message)
	end
end)
return nil
