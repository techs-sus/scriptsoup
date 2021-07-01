# COMRADIO PROTOCOL v2

All topic names should follow the following format:
comradio:[channel name]
Example: comradio:cats, comradio:

Every message must be a JSON-encoded dictionary containing the following items:
* Type: type of message (see section below)
* Contents: text if type is "text" or asset ID
* Comment: text message (only displayed if type isn't "text")
* Author: user ID of sender

The official comradio client supports the following message types, but you can add your own!
* text
* image
* sound
* welcome (used internally)

Example:
```json
{
	"Type": "sound",
	"Contents": "rbxassetid://1337",
	"Comment": "B)",
	"Author": 2
}
```
```json
{
	"Type": "text",
	"Contents": "Hi everyone! How are you all doing?",
	"Comment": "",
	"Author": 3
}
```