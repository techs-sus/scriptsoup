-- Compiled with roblox-ts v1.1.1
local http = game:GetService("HttpService")
local screen = loadstring(http:GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"))()
screen.Parent = script
local _0 = (owner.Character:FindFirstChild("Head")).CFrame
local _1 = CFrame.new(0, 0, -5)
screen.CFrame = _0 * _1
local UI = screen:FindFirstChild("SurfaceGui"):FindFirstChild("Frame")
local out = UI:FindFirstChild("output")
local template = out:FindFirstChild("1")
out:FindFirstChild("0"):Destroy()
template.Parent = nil
local remote = Instance.new("RemoteEvent", owner:FindFirstChild("PlayerGui"))
local remoteBack = Instance.new("RemoteEvent", remote)
remoteBack.Name = "remback"
local ref = Instance.new("ObjectValue", remote)
ref.Name = "ref"
ref.Value = screen
NLS([[
		local rem = script.Parent
		local remback = rem:WaitForChild("remback")
		local ref = rem:WaitForChild("ref")
		local screen = ref.Value
		script.Parent = rem.Parent
		rem.Parent = script
		ref.Parent = script

		local gui = screen:WaitForChild("SurfaceGui")
		gui.Parent = script
		gui.Adornee = screen

		local UI = gui:WaitForChild("Frame")
		local box = UI:WaitForChild("input")
		local go = box:WaitForChild("go")
		local out = UI:WaitForChild("output")
		local log = out:WaitForChild("help")
		out:WaitForChild("welcome"):Destroy()
		log.Parent = nil

		go.MouseButton1Click:Connect(function()
			local text = box.Text
			print(text)
			box.Text = ""
			rem:FireServer("exec", text)
		end)
		remback.OnClientEvent:Connect(function(text)
			local new = log:Clone()
			new.Name = os.clock()
			new.Text = text
			new.Parent = out
		end)
	]], remote)
remote.OnServerEvent:Connect(function(player, mode, meta)
	print(player, mode, meta)
	remoteBack:FireClient(owner, "~ " .. tostring(meta))
	local box = template:Clone()
	box.Name = tostring(os.clock())
	box.Text = "~ " .. tostring(meta)
end)
return nil
