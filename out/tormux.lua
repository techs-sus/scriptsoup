-- Compiled with roblox-ts v1.1.1
local http = game:GetService("HttpService")
local screen = loadstring(http:GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"))()
screen.Parent = script
local UI = screen:FindFirstChild("SurfaceGui"):FindFirstChild("Frame")
local remote = Instance.new("RemoteEvent", owner:FindFirstChild("PlayerGui"))
local ref = Instance.new("ObjectValue", remote)
ref.Name = "ref"
ref.Value = UI
NLS([[

	]], remote)
return nil
