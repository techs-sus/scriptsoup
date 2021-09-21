-- Compiled with roblox-ts v1.2.3
local gravity = 192
local Point
do
	Point = setmetatable({}, {
		__tostring = function()
			return "Point"
		end,
	})
	Point.__index = Point
	function Point.new(...)
		local self = setmetatable({}, Point)
		return self:constructor(...) or self
	end
	function Point:constructor(position, anchored, friction)
		self.velocity = Vector3.new()
		self.gravity = Vector3.new()
		self.friction = 0.99
		self.anchored = false
		self.position = position
		self.previousPosition = position
		if friction ~= nil then
			self.friction = friction
		end
		if anchored ~= nil then
			self.anchored = anchored
		end
	end
	function Point:update(delta)
		if true then
			self.gravity = Vector3.new(0, -gravity, 0)
			local _position = self.position
			local _previousPosition = self.previousPosition
			self.velocity = _position - _previousPosition
			self.previousPosition = self.position
			local _velocity = self.velocity
			local _friction = self.friction
			local _gravity = self.gravity
			local _arg0 = bit32.bxor(delta, 2)
			local transform = (_velocity * _friction + _gravity) * _arg0
			print(transform)
			self.position = self.position + transform
		else
			self.gravity = Vector3.new()
			self.velocity = Vector3.new()
			self.previousPosition = Vector3.new()
		end
	end
end
local Constraint
do
	Constraint = setmetatable({}, {
		__tostring = function()
			return "Constraint"
		end,
	})
	Constraint.__index = Constraint
	function Constraint.new(...)
		local self = setmetatable({}, Constraint)
		return self:constructor(...) or self
	end
	function Constraint:constructor(point1, point2, distance)
		self.line = Instance.new("Part")
		self.mesh = Instance.new("BlockMesh")
		self.point1 = point1
		self.point2 = point2
		local _result
		if distance ~= nil then
			_result = distance
		else
			local _position = point1.position
			local _position_1 = point2.position
			_result = (_position - _position_1).Magnitude
		end
		self.restDistance = _result
		self.line.Size = Vector3.new(0.2, 0.2, 0.2)
		self.line.Anchored = true
		self.line.CanCollide = false
		self.line.BrickColor = BrickColor.random()
		self.line.Parent = script
	end
	function Constraint:solve()
		if self.point1 and self.point2 then
			local _position = self.point1.position
			local _position_1 = self.point2.position
			local difference = _position - _position_1
			local distance = difference.Magnitude
			local scalar = (self.restDistance - distance) / distance
			local translation = difference * 0.5 * scalar
			if not self.point1.anchored then
				self.point1.position = self.point1.position + translation
			end
			if not self.point2.anchored then
				self.point2.position = self.point2.position + translation
			end
		end
	end
	function Constraint:draw()
		if self.point1 and self.point2 and self.line then
			local _position = self.point1.position
			local _position_1 = self.point2.position
			local distance = (_position - _position_1).Magnitude
			local _cFrame = CFrame.new(self.point1.position, self.point2.position)
			local _cFrame_1 = CFrame.new(0, 0, -distance / 2)
			self.line.CFrame = _cFrame * _cFrame_1
			self.line.Size = Vector3.new(0.2, 0.2, distance)
		end
	end
end
local cube = {
	points = {},
	constraints = {},
}
cube.points = { Point.new(Vector3.new(-5, 15, -5)), Point.new(Vector3.new(5, 15, -5)), Point.new(Vector3.new(-5, 15, 5)), Point.new(Vector3.new(5, 15, 5)), Point.new(Vector3.new(-5, 5, -5)), Point.new(Vector3.new(5, 5, -5)), Point.new(Vector3.new(-5, 5, 5)), Point.new(Vector3.new(5, 5, 5)) }
cube.constraints = { Constraint.new(cube.points[1], cube.points[2], 10), Constraint.new(cube.points[1], cube.points[3], 10), Constraint.new(cube.points[2], cube.points[4], 10), Constraint.new(cube.points[3], cube.points[4], 10), Constraint.new(cube.points[5], cube.points[6], 10), Constraint.new(cube.points[5], cube.points[7], 10), Constraint.new(cube.points[6], cube.points[8], 10), Constraint.new(cube.points[7], cube.points[8], 10), Constraint.new(cube.points[1], cube.points[5], 10), Constraint.new(cube.points[2], cube.points[6], 10), Constraint.new(cube.points[3], cube.points[7], 10), Constraint.new(cube.points[4], cube.points[8], 10) }
local RunService = game:GetService("RunService")
--[[
	RunService.Heartbeat.Connect(function (delta: number) {
	});
]]
while true do
	local delta = task.wait(1 / 10)
	local _points = cube.points
	local _arg0 = function(point)
		point:update(delta)
	end
	-- ▼ ReadonlyArray.forEach ▼
	for _k, _v in ipairs(_points) do
		_arg0(_v, _k - 1, _points)
	end
	-- ▲ ReadonlyArray.forEach ▲
	local _constraints = cube.constraints
	local _arg0_1 = function(constraint)
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not (i < 10) then
					break
				end
				constraint:solve()
			end
		end
	end
	-- ▼ ReadonlyArray.forEach ▼
	for _k, _v in ipairs(_constraints) do
		_arg0_1(_v, _k - 1, _constraints)
	end
	-- ▲ ReadonlyArray.forEach ▲
	local _constraints_1 = cube.constraints
	local _arg0_2 = function(constraint)
		constraint:draw()
	end
	-- ▼ ReadonlyArray.forEach ▼
	for _k, _v in ipairs(_constraints_1) do
		_arg0_2(_v, _k - 1, _constraints_1)
	end
	-- ▲ ReadonlyArray.forEach ▲
end
return nil
