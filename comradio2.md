# COMRADIO PROTOCOL v2

## Topic names
The default topic name is "comradio:".
All topic names should follow the following format:
comradio:[channel name]
Example: comradio:cats, comradio:

## Messages
Every message must be a JSON-encoded dictionary containing the following items:
* Type: type of message (see section below)
* Content: depends on type
* Comment: text message (only displayed if type isn't "text")
* Author: user ID of sender

The official comradio client supports the following message types, but you can add your own!
* text (contents)
* image (content + comment)
* sound (content + comment)
* status (comment)
* ping (content + comment)
* welcome (used internally)

## Examples
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
```json
{
	"Type": "ping",
	"Contents": "1",
	"Comment": "no.",
	"Author": 4
}
```