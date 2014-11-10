#first-person-camera

###What is that?

first-person-camera is a (obviously) first-person camera and controls for [three.js](http://threejs.org/).

###Usage

add this script to your html after three.js, and then:

`var camera = new FirstPersonCamera();`

and then in your scene render function: 

`camera.update();`
`renderer.render(scene,camera.object);`

###Options

movementSpeed - movement speed. Defaults to 1.

target - three.js Vector3 for camera direction. Do not use it, until you don't understand how it works.

###Controls

It has classical first-person shooter camera controls - move your mouse to change camera direction, and WASD to move.