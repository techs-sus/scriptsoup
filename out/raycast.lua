-- Compiled with roblox-ts v1.1.1
local function raycast(origin, normal)
	local result = game.Workspace:Raycast(origin, normal)
	if result then
		if result.Instance ~= game.Workspace.Terrain then
			local color = result.Instance.Color
			if result.Instance.Reflectance > 0 then
				local _0 = normal
				local _1 = result.Normal
				local _2 = normal:Dot(result.Normal) * 2
				local reflectedNormal = (_0 - (_1 * _2)) * 100
				color = color:Lerp(raycast(result.Position, reflectedNormal), result.Instance.Reflectance)
			end
			if result.Instance.Transparency > 0 then
				local _0 = color
				local _1 = result.Position
				local _2 = normal.Unit
				local _3 = result.Instance.Size
				color = _0:Lerp(raycast(_1 + (_2 * _3), normal), result.Instance.Transparency)
			end
			if game.Workspace:Raycast(result.Position, Vector3.new(0.5, 0.1, 0) * 100) then
				color = color:Lerp(Color3.new(0, 0, 0), 1 - result.Instance.Transparency)
			end
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
local pixels = {}
do
	local _0 = -50
	while _0 < 50 do
		local x = _0
		pixels[x + 1] = {}
		do
			local _1 = -50
			while _1 < 50 do
				local y = _1
				if y % 16 == 0 then
					wait(1 / 10)
				end
				local pixel = Instance.new("WedgePart")
				pixel.Size = Vector3.new(1, 1, 1) * 0.1
				pixel.Anchored = true
				pixel.Position = Vector3.new(x / 10 + 20, y / 10 + 10, 20)
				pixels[x + 1][y + 1] = pixel
				local _2 = CFrame.new(20, 10, 15)
				local _3 = CFrame.Angles(y / 100, x / 100, 0)
				local cf = _2 * _3
				local normal = cf.LookVector * 100
				local origin = cf.Position
				local color = raycast(origin, normal)
				if x > -50 then
					local prevPixel = pixels[x - 1 + 1][y + 1]
					if eqColor(prevPixel.Color, color) then
						pixels[x + 1][y + 1] = prevPixel
						local _4 = prevPixel.Position
						local _5 = Vector3.new(0.05, 0, 0)
						prevPixel.Position = _4 + _5
						local _6 = prevPixel.Size
						local _7 = Vector3.new(0.1, 0, 0)
						prevPixel.Size = _6 + _7
						pixel:Destroy()
						_1 = y
						_1 += 1
						continue
					end
				end
				pixel.Color = color
				pixel.Parent = script
				_1 = y
				_1 += 1
			end
		end
		_0 = x
		_0 += 1
	end
end
return nil
