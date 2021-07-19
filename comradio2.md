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
* diffieHellmanExchange (see section below)
* encrypted (content + comment)

## Diffie-Hellman Key Exchange
You can use this message type to easily exchange secrets with another listener.
The comment is used to tell the stage of the exchange and who the message is targeted to.
The comment value can be "1a;3", which means stage 1a targeted to listener 3.
A key exchange might look like this:
1. Alice sends the modulus `p = 23` and base `g = 5`
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "23;5",
	"Comment": "1a;3",
	"Author": 2
}
```
2. Bob confirms that they received the message
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "23;5",
	"Comment": "1b;2",
	"Author": 3
}
```
3. Alice (id 2) chooses a secret integer `a = 4`, then sends Bob `A = g^a % p`
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "4",
	"Comment": "2a;3",
	"Author": 2
}
```
4. Bob (id 3) chooses a secret integer b = 3, then sends Alice `B = g^b % p`
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "10",
	"Comment": "2b;2",
	"Author": 3
}
```
5. Alice computes `s = B^a % p`
```lua
local s = B^a % p
```
6. Bob computes `s = A^b % p`
```lua
local s = A^b % p
```
7. Alice sends a message to show that she has the secret key
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "confirmed",
	"Comment": "3;3",
	"Author": 2
}
```
8. Bob sends a message to show that she has the secret key
```json
{
	"Type": "diffieHellmanExchange",
	"Contents": "confirmed",
	"Comment": "3;2",
	"Author": 3
}
```
9. Alice and Bob now share a secret key.
This can be used for creating private channels to share with another listener or
sending encrypted messages.
The shared key should be stored for later usage (see section below).

## Encrypted messages
The contents should be the target listener ID. The comment must be space-seperated
hex codes that will be decrypted with the XOR cipher using the saved shared key.

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
```json
{
	"Type": "encrypted",
	"Contents": "2",
	"Comment": "04 04 00 07 57 5E 40 57",
	"Author": "3"
}