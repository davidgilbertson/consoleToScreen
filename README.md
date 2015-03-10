#Console To Screen
This is a little tool that overrides `console.log()` and sends messages to an on-screen window.

Nice for testing on super-old IE and mobile devices if you don't have proper debugging in place.

#Setup
##For the ReactJS version
Just include the `<ScreenConsole />` component anywhere in your code.

#For the Vanilla JavaScript version
1. Include cts.js

2. Call `CTS.init()` somewhere after that, conditionally if you like.

Yeah that's about it. `console.log()` will now send text to an ugly black box on the screen.

No, there are no options :).

Yes, it looks like there might be options because they're referenced in the code, but there isn't.
