-- Compiled with roblox-ts v1.1.1
local pointlights = {}
local _0 = game.Workspace:GetDescendants()
local _1 = function(light)
	if light:IsA("PointLight") then
		local _2 = pointlights
		local _3 = light
		-- ▼ Array.push ▼
		_2[#_2 + 1] = _3
		-- ▲ Array.push ▲
	end
end
-- ▼ ReadonlyArray.forEach ▼
for _2, _3 in ipairs(_0) do
	_1(_3, _2 - 1, _0)
end
-- ▲ ReadonlyArray.forEach ▲
local inSphere
local function raycast(origin, normal)
	local result = game.Workspace:Raycast(origin, normal)
	if result then
		if result.Instance ~= game.Workspace.Terrain then
			local color = result.Instance.Color
			if result.Instance.Reflectance > 0 then
				local _2 = normal
				local _3 = result.Normal
				local _4 = normal:Dot(result.Normal) * 2
				local reflectedNormal = (_2 - (_3 * _4)) * 100
				color = color:Lerp(raycast(result.Position, reflectedNormal), result.Instance.Reflectance)
			end
			if result.Instance.Transparency > 0 then
				local _2 = color
				local _3 = result.Position
				local _4 = normal.Unit
				local _5 = result.Instance.Size
				color = _2:Lerp(raycast(_3 + (_4 * _5), normal), result.Instance.Transparency)
			end
			--[[
				was very ugly
				if (game.Workspace.Raycast(result.Position, new Vector3(0.5, 0.1, 0).mul(100))) {
				color = color.Lerp(new Color3(0, 0, 0), 1 - result.Instance.Transparency);
				}
			]]
			local _2 = pointlights
			local _3 = function(light)
				if inSphere((light.Parent).Position, light.Range, result.Position) then
					color = color:Lerp(light.Color, light.Brightness / 120)
				end
			end
			-- ▼ ReadonlyArray.forEach ▼
			for _4, _5 in ipairs(_2) do
				_3(_5, _4 - 1, _2)
			end
			-- ▲ ReadonlyArray.forEach ▲
			return color
		else
			return game.Workspace.Terrain:GetMaterialColor(result.Material)
		end
	end
	return Color3.fromRGB(69, 217, 255)
end
local function eqColor(a, b)
	local diffr = math.abs(a.R - b.R)
	local diffg = math.abs(a.G - b.G)
	local diffb = math.abs(a.B - b.B)
	return diffr < 0.1 and diffg < 0.1 and diffb < 0.1
end
function inSphere(center, radius, point)
	return point.X < center.X + radius and point.X > center.X - radius and point.Y < center.Y + radius and point.Y > center.Y - radius and point.Z < center.Z + radius and point.Z > center.Z - radius
end
local pixels = {}
do
	local _2 = -50
	while _2 < 50 do
		local x = _2
		pixels[x + 1] = {}
		do
			local _3 = -50
			while _3 < 50 do
				local y = _3
				if y % 16 == 0 then
					wait(1 / 40)
				end
				local pixel = Instance.new("WedgePart")
				pixel.Size = Vector3.new(1, 1, 1) * 0.1
				pixel.Anchored = true
				pixel.Position = Vector3.new(x / 10 + 20, y / 10 + 10, 20)
				pixels[x + 1][y + 1] = pixel
				local _4 = CFrame.new(20, 10, 15)
				local _5 = CFrame.Angles(y / 100, x / 100, 0)
				local cf = _4 * _5
				local normal = cf.LookVector * 100
				local origin = cf.Position
				local color = raycast(origin, normal)
				if x > -50 then
					local prevPixel = pixels[x - 1 + 1][y + 1]
					if eqColor(prevPixel.Color, color) then
						pixels[x + 1][y + 1] = prevPixel
						local _6 = prevPixel.Position
						local _7 = Vector3.new(0.05, 0, 0)
						prevPixel.Position = _6 + _7
						local _8 = prevPixel.Size
						local _9 = Vector3.new(0.1, 0, 0)
						prevPixel.Size = _8 + _9
						pixel:Destroy()
						_3 = y
						_3 += 1
						continue
					end
				end
				pixel.Color = color
				pixel.Parent = script
				_3 = y
				_3 += 1
			end
		end
		_2 = x
		_2 += 1
	end
end
return nil
