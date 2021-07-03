local partsWithId = {}
local awaitRef = {}

local root = {
	ID = 0;
	Type = "Part";
	Properties = {
		BottomSurface = Enum.SurfaceType.Smooth;
		Color = Color3.new(59/255,56/255,58/255);
		CFrame = CFrame.new(20.5,4.5,-18,1,0,0,0,1,0,0,0,1);
		BrickColor = BrickColor.new(86/255,22/85,18/85);
		Size = Vector3.new(1,5,6);
		Transparency = 1;
		brickColor = BrickColor.new(86/255,22/85,18/85);
		Position = Vector3.new(20.5,4.5,-18);
		Anchored = true;
		Material = Enum.Material.SmoothPlastic;
		Name = "screen";
		TopSurface = Enum.SurfaceType.Smooth;
	};
	Children = {
		{
			ID = 1;
			Type = "SurfaceGui";
			Properties = {
				LightInfluence = 1;
				Face = Enum.NormalId.Left;
				ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
				ClipsDescendants = true;
			};
			Children = {
				{
					ID = 2;
					Type = "Frame";
					Properties = {
						Size = UDim2.new(1,0,1,0);
						BorderSizePixel = 0;
						BackgroundColor3 = Color3.new(59/255,56/255,58/255);
					};
					Children = {
						{
							ID = 3;
							Type = "UIPadding";
							Properties = {
								PaddingBottom = UDim.new(0,20);
								PaddingTop = UDim.new(0,20);
								PaddingLeft = UDim.new(0,20);
								PaddingRight = UDim.new(0,20);
							};
							Children = {};
						};
						{
							ID = 4;
							Type = "Frame";
							Properties = {
								AnchorPoint = Vector2.new(0.5,1);
								Name = "widgets";
								Position = UDim2.new(0.5,0,1,0);
								Size = UDim2.new(1,0,0.18000000715256,0);
								BorderSizePixel = 0;
								BackgroundColor3 = Color3.new(4/15,4/15,4/15);
							};
							Children = {
								{
									ID = 5;
									Type = "UIPadding";
									Properties = {
										PaddingBottom = UDim.new(0,10);
										PaddingTop = UDim.new(0,10);
										PaddingLeft = UDim.new(0,10);
										PaddingRight = UDim.new(0,10);
									};
									Children = {};
								};
								{
									ID = 6;
									Type = "TextLabel";
									Properties = {
										FontSize = Enum.FontSize.Size24;
										TextColor3 = Color3.new(1,1,1);
										BackgroundColor3 = Color3.new(28/85,28/85,28/85);
										Text = "<b>Quote</b><br/><i>Don't cry because it ended, smile because it happened.</i>";
										TextSize = 20;
										TextWrapped = true;
										Size = UDim2.new(0,200,0,50);
										Font = Enum.Font.SourceSans;
										Name = "1";
										TextXAlignment = Enum.TextXAlignment.Left;
										TextScaled = true;
										TextYAlignment = Enum.TextYAlignment.Top;
										BorderSizePixel = 0;
										TextWrap = true;
									};
									Children = {
										{
											ID = 7;
											Type = "UIPadding";
											Properties = {
												PaddingBottom = UDim.new(0,5);
												PaddingTop = UDim.new(0,5);
												PaddingLeft = UDim.new(0,5);
												PaddingRight = UDim.new(0,5);
											};
											Children = {};
										};
									};
								};
								{
									ID = 8;
									Type = "UIGridLayout";
									Properties = {
										CellSize = UDim2.new(0.49500000476837,0,1,0);
									};
									Children = {};
								};
								{
									ID = 9;
									Type = "TextLabel";
									Properties = {
										FontSize = Enum.FontSize.Size32;
										TextColor3 = Color3.new(1,1,1);
										BackgroundColor3 = Color3.new(28/85,28/85,28/85);
										Text = "<b>Time</b><br/><i>13:43</i>";
										TextSize = 30;
										TextWrapped = true;
										Size = UDim2.new(0,200,0,50);
										Font = Enum.Font.SourceSans;
										Name = "2";
										TextXAlignment = Enum.TextXAlignment.Left;
										TextScaled = true;
										TextYAlignment = Enum.TextYAlignment.Top;
										BorderSizePixel = 0;
										TextWrap = true;
									};
									Children = {
										{
											ID = 10;
											Type = "UIPadding";
											Properties = {
												PaddingBottom = UDim.new(0,5);
												PaddingTop = UDim.new(0,5);
												PaddingLeft = UDim.new(0,5);
												PaddingRight = UDim.new(0,5);
											};
											Children = {};
										};
									};
								};
							};
						};
						{
							ID = 11;
							Type = "Frame";
							Properties = {
								AnchorPoint = Vector2.new(0.5,0.5);
								Name = "output";
								ClipsDescendants = true;
								Position = UDim2.new(0.5,0,0.46000000834465,0);
								Size = UDim2.new(1,0,0.66000002622604,0);
								BorderSizePixel = 0;
								BackgroundColor3 = Color3.new(3/17,3/17,3/17);
							};
							Children = {
								{
									ID = 12;
									Type = "UIListLayout";
									Properties = {
										VerticalAlignment = Enum.VerticalAlignment.Bottom;
										SortOrder = Enum.SortOrder.LayoutOrder;
										Padding = UDim.new(0,4);
									};
									Children = {};
								};
								{
									ID = 13;
									Type = "TextLabel";
									Properties = {
										FontSize = Enum.FontSize.Size28;
										TextColor3 = Color3.new(203/255,203/255,203/255);
										Text = "Welcome to luarepl!";
										Font = Enum.Font.SourceSans;
										BackgroundTransparency = 1;
										TextXAlignment = Enum.TextXAlignment.Left;
										TextSize = 25;
										TextYAlignment = Enum.TextYAlignment.Top;
										BorderSizePixel = 0;
										BackgroundColor3 = Color3.new(1,1,1);
									};
									Children = {};
								};
								{
									ID = 14;
									Type = "UIPadding";
									Properties = {
										PaddingBottom = UDim.new(0,10);
										PaddingTop = UDim.new(0,10);
										PaddingLeft = UDim.new(0,10);
										PaddingRight = UDim.new(0,10);
									};
									Children = {};
								};
								{
									ID = 15;
									Type = "TextLabel";
									Properties = {
										FontSize = Enum.FontSize.Size28;
										TextColor3 = Color3.new(203/255,203/255,203/255);
										Text = "Use terminal.help() for help";
										Font = Enum.Font.SourceSans;
										BackgroundTransparency = 1;
										TextXAlignment = Enum.TextXAlignment.Left;
										TextSize = 25;
										TextYAlignment = Enum.TextYAlignment.Top;
										BorderSizePixel = 0;
										BackgroundColor3 = Color3.new(1,1,1);
									};
									Children = {};
								};
							};
						};
						{
							ID = 16;
							Type = "TextBox";
							Properties = {
								TextXAlignment = Enum.TextXAlignment.Left;
								FontSize = Enum.FontSize.Size32;
								PlaceholderColor3 = Color3.new(28/85,28/85,28/85);
								Active = false;
								Selectable = false;
								Text = "";
								TextSize = 30;
								TextColor3 = Color3.new(211/255,211/255,211/255);
								AnchorPoint = Vector2.new(0.5,0);
								Font = Enum.Font.SourceSans;
								Name = "input";
								Position = UDim2.new(0.5,0,0,0);
								Size = UDim2.new(1,0,0.10000000149012,0);
								PlaceholderText = "tormux";
								BorderSizePixel = 0;
								BackgroundColor3 = Color3.new(4/15,4/15,4/15);
							};
							Children = {
								{
									ID = 17;
									Type = "UIPadding";
									Properties = {
										PaddingBottom = UDim.new(0,10);
										PaddingTop = UDim.new(0,10);
										PaddingLeft = UDim.new(0,10);
										PaddingRight = UDim.new(0,10);
									};
									Children = {};
								};
								{
									ID = 18;
									Type = "TextButton";
									Properties = {
										FontSize = Enum.FontSize.Size14;
										TextColor3 = Color3.new(1,1,1);
										TextWrapped = true;
										Text = ">";
										Size = UDim2.new(0,30,1,0);
										TextSize = 14;
										AnchorPoint = Vector2.new(1,0);
										Font = Enum.Font.SourceSans;
										Name = "go";
										Position = UDim2.new(1,0,0,0);
										BackgroundColor3 = Color3.new(6/17,6/17,6/17);
										TextScaled = true;
										BorderSizePixel = 0;
										TextWrap = true;
									};
									Children = {};
								};
							};
						};
					};
				};
			};
		};
	};
};

local function Scan(item, parent)
	local obj = Instance.new(item.Type)
	if (item.ID) then
		local awaiting = awaitRef[item.ID]
		if (awaiting) then
			awaiting[1][awaiting[2]] = obj
			awaitRef[item.ID] = nil
		else
			partsWithId[item.ID] = obj
		end
	end
	for p,v in pairs(item.Properties) do
		if (type(v) == "string") then
			local id = tonumber(v:match("^_R:(%w+)_$"))
			if (id) then
				if (partsWithId[id]) then
					v = partsWithId[id]
				else
					awaitRef[id] = {obj, p}
					v = nil
				end
			end
		end
		obj[p] = v
	end
	for _,c in pairs(item.Children) do
		Scan(c, obj)
	end
	obj.Parent = parent
	return obj
end

return Scan(root, nil)