-- Compiled with roblox-ts v1.1.1
local owner = owner
local char = owner.Character
local hum = char:FindFirstChild("Humanoid")
local torso = (char:FindFirstChild("Torso") or char:FindFirstChild("UpperTorso"))
local players = game:GetService("Players")
local tool = Instance.new("Tool")
tool.Name = owner.DisplayName
owner.Character.Parent = tool
local handle = Instance.new("Part")
handle.Name = "Handle"
handle.Transparency = 1
handle.Parent = tool
local weld = Instance.new("Weld")
weld.Part0 = handle
weld.Part1 = torso
weld.Parent = handle
tool.Equipped:Connect(function()
	hum.Sit = true
end)
handle.Touched:Connect(function(part)
	local _0 = part.Parent
	if _0 ~= nil then
		_0 = _0:FindFirstChild("Humanoid")
	end
	local hum = _0
	if hum then
		local _1 = players:GetPlayerFromCharacter(part.Parent)
		if _1 ~= nil then
			_1 = _1:FindFirstChild("Backpack")
		end
		local _2 = _1
		if not _2 then
			_2 = tool.Parent
		end
		tool.Parent = _2
	end
end)
return nil
