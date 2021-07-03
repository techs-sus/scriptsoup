local screen = Instance.new("Part")
screen.Name = "screen"
screen.Anchored = true
screen.BottomSurface = Enum.SurfaceType.Smooth
screen.TopSurface = Enum.SurfaceType.Smooth
screen.Transparency = 1
screen.Color = Color3.fromRGB(59, 56, 58)
screen.Material = Enum.Material.SmoothPlastic
screen.Size = Vector3.new(1, 5, 6)
screen.CFrame = CFrame.new(20.5, 4.5, -18)

local SurfaceGui = Instance.new("SurfaceGui")
SurfaceGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
SurfaceGui.Face = Enum.NormalId.Left
SurfaceGui.LightInfluence = 1
SurfaceGui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
SurfaceGui.PixelsPerStud = 100
SurfaceGui.ClipsDescendants = true
SurfaceGui.Parent = screen

local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(1, 0, 1, 0)
Frame.BorderSizePixel = 0
Frame.BackgroundColor3 = Color3.fromRGB(59, 56, 58)
Frame.Parent = SurfaceGui

local UIPadding = Instance.new("UIPadding")
UIPadding.PaddingTop = UDim.new(0, 20)
UIPadding.PaddingBottom = UDim.new(0, 20)
UIPadding.PaddingLeft = UDim.new(0, 20)
UIPadding.PaddingRight = UDim.new(0, 20)
UIPadding.Parent = Frame

local widgets = Instance.new("Frame")
widgets.Name = "widgets"
widgets.AnchorPoint = Vector2.new(0.5, 1)
widgets.Size = UDim2.new(1, 0, 0.18, 0)
widgets.Position = UDim2.new(0.5, 0, 1, 0)
widgets.BorderSizePixel = 0
widgets.BackgroundColor3 = Color3.fromRGB(68, 68, 68)
widgets.Parent = Frame

local UIPadding1 = Instance.new("UIPadding")
UIPadding1.PaddingTop = UDim.new(0, 10)
UIPadding1.PaddingBottom = UDim.new(0, 10)
UIPadding1.PaddingLeft = UDim.new(0, 10)
UIPadding1.PaddingRight = UDim.new(0, 10)
UIPadding1.Parent = widgets

local TextBox = Instance.new("TextBox")
TextBox.Name = "1"
TextBox.Size = UDim2.new(0, 200, 0, 50)
TextBox.BorderSizePixel = 0
TextBox.BackgroundColor3 = Color3.fromRGB(84, 84, 84)
TextBox.FontSize = Enum.FontSize.Size24
TextBox.TextSize = 20
TextBox.RichText = true
TextBox.TextColor3 = Color3.fromRGB(255, 255, 255)
TextBox.Text = "<b>Quote</b><br/><i>Don't cry because it ended, smile because it happened.</i>"
TextBox.TextYAlignment = Enum.TextYAlignment.Top
TextBox.TextWrap = true
TextBox.Font = Enum.Font.SourceSans
TextBox.TextWrapped = true
TextBox.TextXAlignment = Enum.TextXAlignment.Left
TextBox.TextScaled = true
TextBox.Parent = widgets

local UIPadding2 = Instance.new("UIPadding")
UIPadding2.PaddingTop = UDim.new(0, 5)
UIPadding2.PaddingBottom = UDim.new(0, 5)
UIPadding2.PaddingLeft = UDim.new(0, 5)
UIPadding2.PaddingRight = UDim.new(0, 5)
UIPadding2.Parent = TextBox

local UICorner = Instance.new("UICorner")
UICorner.Parent = TextBox

local UIGridLayout = Instance.new("UIGridLayout")
UIGridLayout.CellSize = UDim2.new(0.495, 0, 1, 0)
UIGridLayout.Parent = widgets

local TextBox1 = Instance.new("TextBox")
TextBox1.Name = "2"
TextBox1.Size = UDim2.new(0, 200, 0, 50)
TextBox1.BorderSizePixel = 0
TextBox1.BackgroundColor3 = Color3.fromRGB(84, 84, 84)
TextBox1.FontSize = Enum.FontSize.Size32
TextBox1.TextSize = 30
TextBox1.RichText = true
TextBox1.TextColor3 = Color3.fromRGB(255, 255, 255)
TextBox1.Text = "<b>Time</b><br/><i>13:43</i>"
TextBox1.TextYAlignment = Enum.TextYAlignment.Top
TextBox1.TextWrap = true
TextBox1.Font = Enum.Font.SourceSans
TextBox1.TextWrapped = true
TextBox1.TextXAlignment = Enum.TextXAlignment.Left
TextBox1.TextScaled = true
TextBox1.Parent = widgets

local UIPadding3 = Instance.new("UIPadding")
UIPadding3.PaddingTop = UDim.new(0, 5)
UIPadding3.PaddingBottom = UDim.new(0, 5)
UIPadding3.PaddingLeft = UDim.new(0, 5)
UIPadding3.PaddingRight = UDim.new(0, 5)
UIPadding3.Parent = TextBox1

local UICorner1 = Instance.new("UICorner")
UICorner1.Parent = TextBox1

local UICorner2 = Instance.new("UICorner")
UICorner2.Parent = widgets

local output = Instance.new("Frame")
output.Name = "output"
output.AnchorPoint = Vector2.new(0.5, 0.5)
output.Size = UDim2.new(1, 0, 0.66, 0)
output.ClipsDescendants = true
output.Position = UDim2.new(0.5, 0, 0.46, 0)
output.BorderSizePixel = 0
output.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
output.Parent = Frame

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.VerticalAlignment = Enum.VerticalAlignment.Bottom
UIListLayout.Padding = UDim.new(0, 4)
UIListLayout.Parent = output

local TextBox2 = Instance.new("TextBox")
TextBox2.Name = "welcome"
TextBox2.AutomaticSize = Enum.AutomaticSize.XY
TextBox2.BackgroundTransparency = 1
TextBox2.BorderSizePixel = 0
TextBox2.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
TextBox2.FontSize = Enum.FontSize.Size28
TextBox2.TextSize = 25
TextBox2.TextColor3 = Color3.fromRGB(203, 203, 203)
TextBox2.Text = "Welcome to luarepl!"
TextBox2.TextYAlignment = Enum.TextYAlignment.Top
TextBox2.Font = Enum.Font.SourceSans
TextBox2.TextXAlignment = Enum.TextXAlignment.Left
TextBox2.Parent = output

local UIPadding4 = Instance.new("UIPadding")
UIPadding4.PaddingTop = UDim.new(0, 10)
UIPadding4.PaddingBottom = UDim.new(0, 10)
UIPadding4.PaddingLeft = UDim.new(0, 10)
UIPadding4.PaddingRight = UDim.new(0, 10)
UIPadding4.Parent = output

local TextBox3 = Instance.new("TextBox")
TextBox3.Name = "help"
TextBox3.AutomaticSize = Enum.AutomaticSize.XY
TextBox3.BackgroundTransparency = 1
TextBox3.BorderSizePixel = 0
TextBox3.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
TextBox3.FontSize = Enum.FontSize.Size28
TextBox3.TextSize = 25
TextBox3.TextColor3 = Color3.fromRGB(203, 203, 203)
TextBox3.Text = "Use terminal.help() for help"
TextBox3.TextYAlignment = Enum.TextYAlignment.Top
TextBox3.Font = Enum.Font.SourceSans
TextBox3.TextXAlignment = Enum.TextXAlignment.Left
TextBox3.Parent = output

local UICorner3 = Instance.new("UICorner")
UICorner3.Parent = output

local input = Instance.new("TextBox")
input.Name = "input"
input.Selectable = false
input.AnchorPoint = Vector2.new(0.5, 0)
input.Size = UDim2.new(1, 0, 0.1, 0)
input.Position = UDim2.new(0.5, 0, 0, 0)
input.Active = false
input.BorderSizePixel = 0
input.BackgroundColor3 = Color3.fromRGB(68, 68, 68)
input.PlaceholderColor3 = Color3.fromRGB(84, 84, 84)
input.FontSize = Enum.FontSize.Size32
input.TextSize = 30
input.TextColor3 = Color3.fromRGB(211, 211, 211)
input.Text = ""
input.Font = Enum.Font.SourceSans
input.TextXAlignment = Enum.TextXAlignment.Left
input.PlaceholderText = "tormux"
input.Parent = Frame

local UIPadding5 = Instance.new("UIPadding")
UIPadding5.PaddingTop = UDim.new(0, 10)
UIPadding5.PaddingBottom = UDim.new(0, 10)
UIPadding5.PaddingLeft = UDim.new(0, 10)
UIPadding5.PaddingRight = UDim.new(0, 10)
UIPadding5.Parent = input

local go = Instance.new("TextButton")
go.Name = "go"
go.AnchorPoint = Vector2.new(1, 0)
go.Size = UDim2.new(0, 30, 1, 0)
go.Position = UDim2.new(1, 0, 0, 0)
go.BorderSizePixel = 0
go.BackgroundColor3 = Color3.fromRGB(90, 90, 90)
go.FontSize = Enum.FontSize.Size14
go.TextSize = 14
go.TextColor3 = Color3.fromRGB(255, 255, 255)
go.Text = ">"
go.TextWrap = true
go.Font = Enum.Font.SourceSans
go.TextWrapped = true
go.TextScaled = true
go.Parent = input

local UICorner4 = Instance.new("UICorner")
UICorner4.Parent = go

local UICorner5 = Instance.new("UICorner")
UICorner5.Parent = input

local UICorner6 = Instance.new("UICorner")
UICorner6.Parent = Frame

return screen