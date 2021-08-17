local http = game:GetService('HttpService')
local runner = http:RequestAsync({
	Url = "https://raw.githubusercontent.com/snoo8/scriptsoup/main/out/runner.lua",
	Method = "GET",
	Headers = {
		["Cache-Control"] = "no-cache"
	}
}).Body
NS(runner, workspace)
script:Destroy()
return {}