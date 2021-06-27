const workspace: Workspace = game.GetService("Workspace");

workspace.GetDescendants().forEach((object: Instance) => {
	if (object.IsA("Sound")) {
		const sound: Sound = object as Sound;
		print(">", sound.Name, sound.SoundId);
	}
});

export {};
