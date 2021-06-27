-- Compiled with roblox-ts v1.1.1
local workspace = game:GetService("Workspace")
local _0 = workspace:GetDescendants()
local _1 = function(object)
	if object:IsA("Sound") then
		local sound = object
		print(">", sound.Name, sound.SoundId)
	end
end
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
return nil
