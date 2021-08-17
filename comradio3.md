# COMRADIO PROTOCOL v3

comradio v3 is a simple decentralized protocol that allows you to chat with others using
MessagingService, like in IRC.

### Connect to a channel
You need to select a channel before you can send messages.
All channel names look like this:
> comradio3.[Channel name]
The default channel name looks like this:
> comradio3.hub
You can connect to the channel by using MessagingService.SubscribeAsync, with the channel
name and callback.

### Show that you are in the channel
You don't need to do this if you are just looking around. If you want to verify yourself,
you will need to send a verification message. It looks like this:
```json
{
	"author": {
		"nickname": "roblos", // optional
		"id": 1 // your user ID (you can get this with Player.UserId)
	},
	"sentTime": 1, // unix timestamp of when it was sent, the message will be ignored if the difference is greater than 30 seconds
	"type": "verify", // message type
	"token": 1234, // optional, can be any number
}
```

### Sending text messages
You can send text messages by sending a message that looks like this:
```json
{
	"author": {
		"nickname": "roblos",
		"id": 1,
		"token": 0000 // optional, must be your token combined with id and send time
	},
	"sentTime": 2,
	"type": "text",
	"content": "Hello, world!"
}
```
This message can be displayed as:
> [✔️] [roblos] [Roblox] Hello, world!
> [❌] [roblos] Hello, world!
depending on if the token is valid or not.
You can check if a token is valid or not by doing this:
```lua
message.author.token === (token ^ message.author.id) ^ message.sentTime
```

You can send messages with assets attached by sending a message that looks like this:
```json
{
	"author": {
		"nickname": "roblos",
		"id": 1,
		"token": 0000
	},
	"sentTime": 3,
	"type": "asset",
	"content": {
		"id": "rbxassetid://1337", // asset ID
		"type": "Sound", // can be "Image"
		"comment": "epic" // optional text attached to asset
	}
}
```
The asset should be displayed with the message.

If you want to send a text message but don't want it to look like a regular text message,
you can instead send a message that looks like this:
```json
{
	"author": {
		"nickname": "roblos",
		"id": 1,
		"token": 0000
	},
	"sentTime": 4,
	"type": "styletext",
	"content": {
		"text": "left the channel",
		"type": "Action"
	}
}
```
This message can be displayed as:
> [✔️] (Roblox) roblos left the channel
> [❌] roblos left the channel
You can add any other style types, but make sure to keep the Action type!