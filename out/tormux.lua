-- Compiled with roblox-ts v1.1.1
local http = game:GetService("HttpService")
local screen = loadstring(http:GetAsync("https://raw.githubusercontent.com/snoo8/scriptsoup/main/models/tormuxUI.lua"))()
screen.Parent = script
local _0 = (owner.Character:FindFirstChild("Head")).CFrame
local _1 = CFrame.new(0, 0, -5)
screen.CFrame = _0 * _1
local UI = screen:FindFirstChild("SurfaceGui"):FindFirstChild("Frame")
local out = UI:FindFirstChild("output")
local widgets = UI:FindFirstChild("widgets")
local remote = Instance.new("RemoteEvent", owner:FindFirstChild("PlayerGui"))
local ref = Instance.new("ObjectValue", remote)
ref.Name = "ref"
ref.Value = screen
NLS([[
		local rem = script.Parent
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
		print('out')
		table.foreach(out:GetChildren(), print)
		local log = out:WaitForChild("help")
		print('hel')
		out:WaitForChild("welcome"):Destroy()
		print('des')
		log.Parent = nil
		print('go')

		go.MouseButton1Click:Connect(function()
			local text = box.Text
			print(text)
			box.Text = ""
			rem:FireServer("exec", text)
		end)
		rem:FireServer("init")
	]], remote)
local logTemplate = out:FindFirstChild("help")
local widgetTemplate = widgets:FindFirstChild("1")
local availableWidgets = {
	time = function()
		local widget = widgetTemplate:Clone()
		coroutine.wrap(function()
			while true do
				widget.Text = os.date("%H:%M")
				wait(60)
			end
		end)()
		return widget
	end,
	quote = function()
		local widget = widgetTemplate:Clone()
		coroutine.wrap(function()
			while true do
				widget.Text = http:GetAsync("http://api.quotable.io/random")
				wait(35)
			end
		end)()
		return widget
	end,
}
local function log(text)
	local box = logTemplate:Clone()
	box.Name = tostring(os.clock())
	box.Text = text
	box.Parent = out
end
local env = getfenv(0)
local terminalLib = {
	log = log,
	help = function()
		log("terminal.log ( text: string ) -> void / log to output")
		log("terminal.help () -> void / show help")
		log("terminal.setWidget ( num: string, widget: Widget ) -> void / set widget")
		log("terminal.widgets -> Widget[] / list of widgets")
	end,
	widgets = availableWidgets,
	setWidget = function(num, widget)
		local _2 = widgets:FindFirstChild(num)
		if _2 ~= nil then
			_2:Destroy()
		end
		local newWidget = widget()
		newWidget.Name = num
		newWidget.Parent = widgets
	end,
}
env.terminal = terminalLib
remote.OnServerEvent:Connect(function(player, mode, meta)
	print(player, mode, meta)
	if mode == "exec" then
		log("~ " .. tostring(meta))
		local run = loadstring(meta)
		setfenv(run, env)
		run()
	elseif mode == "init" then
		out:FindFirstChild("welcome"):Destroy()
		widgets:FindFirstChild("2"):Destroy()
		logTemplate.Parent = nil
		widgetTemplate.Parent = nil
		log("Welcome to Tormux")
		log("Enter terminal.help() for help")
		terminalLib.setWidget("1", availableWidgets.quote)
		terminalLib.setWidget("2", availableWidgets.time)
	end
end)
return nil
