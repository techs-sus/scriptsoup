# COMRADIO PROTOCOL v2

comradio is a Discord-like platform where you can
talk with anyone in any server, as long as you are
in the same game.

All messages must be sent as a dictionary containing these values:
Type: type of message (see section below)
Author: user ID of sender (see section below)
Contents: either the text message or the asset ID
Comment: text message for the asset (only displayed if type is not "text")

# Available types
* text (text message)
* image
* sound
* welcome (used internally)

# Authority
Since comradio is based on MessagingService, it is decentralized
and has no authority. Instead, the receiver is considered as the
central authority when a message is sent. It filters the message
and displays the message correctly.