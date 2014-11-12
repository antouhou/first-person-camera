#first-person-camera

###What is that?

first-person-camera is a (obviously) first-person camera and controls for [three.js](http://threejs.org/).

###Usage

add this script to your html after three.js, and then:

`var camera = new FirstPersonCamera();`

and then add to your scene render function: 

`camera.update();
 renderer.render(scene,camera.object);`

###Options

movementSpeed - movement speed. Defaults to 1.
rotationSpeed - rotation speed. Defaults to 0.02.
canFly - allow camera change it y position by moving forward/backward. Defaults to false.
defaultPosition - default position for camera. Defaults to {x: 0, y:10, z: 0}
targetObj = a THREE.Object3D to place right before camera. It can be a sight, for example. Defaults to empty Object3D. 

###Controls

It has classical first-person shooter camera controls - move your mouse to change camera direction, and WASD to move.