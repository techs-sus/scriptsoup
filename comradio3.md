# COMRADIO PROTOCOL v3

comradio v3 is a simple decentralized protocol that allows you to chat with others using
MessagingService, like in IRC.

## Connecting to channels

You'll need to select a channel before you can send messages.
All channel names look like this:

> comradio3.[Channel name]

The default channel name looks like this:

> comradio3.hub

You can connect to the channel by using MessagingService.SubscribeAsync, with the channel name and callback.

### Show that you are in the channel

You don't need to do this if you are just looking around. If you want to verify yourself,
you will need to send a verification message. It looks like this:

```json
{
 "author": {
  "nickname": "roblos", // optional
  "id": 1 // your user ID (you can get this with owner.UserId)
 },
 "sentTime": 1, // unix timestamp of when it was sent, the message will be ignored if the difference is greater than 30 seconds
 "type": "verify", // message type
 "token": 1234 // optional, can be any number
}
```

### Sending text messages

You can send text messages by sending a message that looks like this:

```json
{
 "author": {
  "nickname": "roblos",
  "id": 1,
  "token": 0000 // Read "Token Validation"
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

### Token Validation

Making tokens is easy. All you need to start is any number. This token you send at "Show that you are in the channel" will be used for validation.

To validate/make tokens, you will need to use bit32.bxor. Tokens will validate if players are legit, and will validate if players are "trusted".

Below you will find some examples of token validation.

You can check if a token is valid or not in Typescript by doing this:

```typescript
(message.author.token === (token ^ message.author.id)) ^ message.sentTime;
```

Or, in Lua you can check if a token is valid or not by doing this:

```lua
sentToken == (bit32.bxor(bit32.bxor(token, id), sentTime))
```

### Sending Assets

You can send messages with assets attached by sending a message that looks like this:

```json
{
 "author": {
  "nickname": "roblos",
  "id": 1,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 3,
 "type": "asset",
 "content": {
  "id": "rbxassetid://1337", // asset id, (not number)
  "type": "Sound", // Image or Sound
  "comment": "epic" // optional text attached to asset
 }
}
```

The asset should be displayed with the message.

### Actions & Styletext

If you want to send a text message but don't want it to look like a regular text message,
you can instead send a message that looks like this:

```json
{
 "author": {
  "nickname": "roblos",
  "id": 1,
  "token": 0000 // Read "Token Validation"
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

### diffieHellmanExchange type

**Typescript** declares **^ as bxor**.

**Lua** declares **^ for power**.

**Please** use bxor in lua instead of ^.

This document uses ^ because they are written in **typescript**

You can use this to send encrypted private messages with a user.

1. Alice (uid 1) sends the modulus p = 23 and base g = 5

```json
{
 "author": {
  "nickname": "Alice",
  "id": 1,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "1a",
  "content": "p;g", // 23;5
  "target": 2
 }
}
```

2. Bob (uid 2) confirms that they received the message, chooses a secret integer `b = 3`, and sends Alice the modulus, base and `B = g ^ b % p`

```json
{
 "author": {
  "nickname": "Bob",
  "id": 2,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "1b",
  "content": "p;g;B", // 23;5;10, 10 is the base
  "target": 2
 }
}
```

3. Alice chooses a secret integer `a = 4`, then sends Bob `A = g ^ a % p`

```json
{
 "author": {
  "nickname": "Bob",
  "id": 2,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "2a",
  "content": "A", // 4 (g ^ a % p)
  "target": 2
 }
}
```

4. Bob confirms that he has recieved the message.

```json
{
 "author": {
  "nickname": "Bob",
  "id": 2,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "2b",
  "content": "confirmed",
  "target": 2
 }
}
```

5. Alice computes `s = B ^ a % p`

```typescript
let s = B ^ a % p;
```

6. Bob computes `s = A ^ b % p`

```typescript
let s = A ^ b % p;
```

7. Alice sends a message saying she has the secret key.

```json
{
 "author": {
  "nickname": "Alice",
  "id": 2,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "3",
  "content": "exchange finished",
  "target": 2
 }
}
```

8. Bob sends a message saying he has the secret key.

```json
{
 "author": {
  "nickname": "Bob",
  "id": 2,
  "token": 0000 // Read "Token Validation"
 },
 "sentTime": 4,
 "type": "diffieHellmanExchange",
 "content": {
  "type": "diffieHellmanExchange",
  "stage": "3",
  "content": "exchange finished",
  "target": 1
 }
}
```

Now, both bob and alice have the secret key. You should store the key in a table for later use.

comradio2 is deprecated. comradio3 (should) be used in all new scripts.
