
# Gamepad on Web browser

## Reference
W3C, http://www.w3.org/TR/gamepad/

MDN, https://developer.mozilla.org/en-US/docs/Web/API/Gamepad

## Gecko
Gamepad WebIDL, https://dxr.mozilla.org/mozilla-central/source/dom/webidl/Gamepad.webidl

Gamepad source code, https://dxr.mozilla.org/mozilla-central/source/dom/gamepad/GamepadService.cpp#546

### Install Xbox controller driver of Mac
https://github.com/d235j/360Controller/releases

### HTML5 Gamepad Tester
http://html5gamepad.com

# VR on Web browser
MozVR, http://mozvr.com/

WebVR lands in Firefox Nightly, http://mozvr.com/posts/webvr-lands-in-nightly/

## Downloads
### Nightly Firefox
https://nightly.mozilla.org

### WebVR Add-on
http://mozvr.com/downloads/

### Disable E10s
Firefox Nightly includes core WebVR functionality, but it is disabled by default. The WebVR Add-On enables WebVR and disables multiprocess browsing (E10S), a new feature which is currently incompatible with WebVR. Once you have installed Firefox Nightly, open it, install the Add-On, and then follow the prompt to restart the browser. Once you've configured your displays (see below) you will be ready to start experiencing the VR web!

### Enable vr
Enter about:config on your url bar and set ```dom.vr.enabled``` to true

For mobile users, Firefox for Android now also supports WebVR in Nightly builds. 
## Gecko
Navigator getVRDevices, https://dxr.mozilla.org/mozilla-central/source/dom/webidl/Navigator.webidl#337

# WebGL on Worker
OffscreenCanvas, 
https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

## Downloads
### Nightly Firefox
https://nightly.mozilla.org

### Disable E10s

### Enable offscreencanvas
Enter about:config on your url bar and set ```gfx.offscreencanvas.enabled``` to true

# AR on Web browser
This is inspired by [Jerome Etienne's slides](http://jeromeetienne.github.io/slides/augmentedrealitywiththreejs/), and it is based on [three.js](https://github.com/mrdoob/three.js/) and [js-aruco](https://github.com/jcmellado/js-aruco)

### How to use
Print this marker

![alt text](https://camo.githubusercontent.com/f55430b914e27388021304f4741f39285158b4bb/687474703a2f2f7777772e696e6d656e7369612e636f6d2f66696c65732f70696374757265732f65787465726e616c2f313030312e706e67 "the marker")

at a white paper.

This demo will catch the marker and show a monster on it.



