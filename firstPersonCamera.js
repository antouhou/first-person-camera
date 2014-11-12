var FirstPersonCamera = function () {

  var deltaX = 0;
  var deltaZ = 0;
  var deltaY = 0;
  var lastPositionY = 0;
  var lastPositionX = 0;
  var lastPositionZ = 0;

  //Some options
  this.movementSpeed = 1;
  this.rotationSpeed = 0.02;
  //Default camera position
  this.defaultPosition = {x: 0, y:10, z: 0};
  this.position = new THREE.Vector3(0,10,0);
  //Enable this to allow camera change it y position by moving forward/backward
  this.canFly = false;
  //Creating target for the camera. You can redefine targetObj, so camera will follow any object,
  //For example:
  //var camera = new FirstPersonCamera();
  //var someRedCube = new THREE.Mesh(someCubeGeometry, someCubeMaterial);
  //camera.targetObj = someRedCube;
  //and camera always will be focused on someRedCube.
  this.targetObj = new THREE.Object3D();

  this.object = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 0.1, 1000);
  this.object.position.set(this.defaultPosition.x, this.defaultPosition.y, this.defaultPosition.z);

  this.target = this.targetObj.position;
  //this.target = new THREE.Vector3(10,10,10);

  this.sideRotation = 0;
  this.upRotation = 0;
  this.deltaRotationX = 0;
  this.deltaRotationY = 0;

  this.move = false;
  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.update = function () {
    lastPositionX = this.object.position.x;
    lastPositionZ = this.object.position.z;
    lastPositionY = this.object.position.y;

    //Перемещаем камеру в соответсвии с нажатыми клавишами
    if (this.moveForward && !this.moveBackward) {
      this.object.translateZ(-this.movementSpeed);
      this.move = true;
    }
    if (this.moveBackward && !this.moveForward) {
      this.object.translateZ(this.movementSpeed);
      this.move = true;
    }
    if (this.moveLeft && !this.moveRight) {
      this.object.translateX(-this.movementSpeed);
      this.move = true;
    }
    if (this.moveRight && !this.moveLeft) {
      this.object.translateX(this.movementSpeed);
      this.move = true;
    }

    //Если камера переместилась, перемещаем и её цель
    if (this.move) {
      if (!this.canFly) {
        this.object.position.y = this.position.y;
      }
      this.move = false;
      deltaX = this.object.position.x - lastPositionX;
      deltaZ = this.object.position.z - lastPositionZ;
      deltaY = this.object.position.y - lastPositionY;
      this.target.x += deltaX;
      this.target.z += deltaZ;
      this.target.y += deltaY;
    }

    if (this.rotateLeft) {
      this.rotateLeft = false;
      this.sideRotation -= this.deltaRotationX*this.rotationSpeed;
      this.target.x = this.object.position.x+20*Math.cos(this.sideRotation);
      this.target.z = this.object.position.z+20*Math.sin(this.sideRotation);
    }

    if (this.rotateRight) {
      this.rotateRight = false;
      this.sideRotation += this.deltaRotationX*0.02;
      this.target.x = this.object.position.x+20*Math.cos(this.sideRotation);
      this.target.z = this.object.position.z+20*Math.sin(this.sideRotation);
    }

    if (this.rotateUp) {
      this.rotateUp = false;
      this.upRotation += this.deltaRotationY*0.3;
      this.target.y = this.object.position.y+this.upRotation;
    }
    if (this.rotateDown) {
      this.rotateDown = false;
      this.upRotation -= this.deltaRotationY*0.3;
      this.target.y = this.object.position.y+this.upRotation;
    }

    this.object.lookAt(this.target);
  };

  //Биндим обработчики кнопок

  document.onkeydown = function (pressedKey) {

    //console.log(pressedKey.keyCode);

    switch(pressedKey.keyCode) {

      case 87: this.moveForward = true; break;
      case 83: this.moveBackward = true; break;
      case 65: this.moveLeft = true; break;
      case 68: this.moveRight = true; break;

    }
  }.bind(this);

  document.onkeyup = function (pressedKey) {

    switch(pressedKey.keyCode) {

      case 87: this.moveForward = false; break;
      case 83: this.moveBackward = false; break;
      case 65: this.moveLeft = false; break;
      case 68: this.moveRight = false; break;

    }
  }.bind(this);

  // Придумать нормальную функцию вращения камеры

  var lastPageX = 0;
  var lastPageY = 0;

  document.onmousemove = function(e) {

    if (e.pageX > lastPageX) {
      this.deltaRotationX = e.pageX - lastPageX;
      this.rotateRight = true;
    }
    if (e.pageX < lastPageX) {
      this.deltaRotationX = lastPageX - e.pageX;
      this.rotateLeft = true;
    }
    if (e.pageY > lastPageY) {
      this.deltaRotationY = e.pageY - lastPageY;
      this.rotateDown = true;
    }
    if (e.pageY < lastPageY) {
      this.deltaRotationY = lastPageY - e.pageY;
      this.rotateUp = true;
    }

    lastPageX = e.pageX;
    lastPageY = e.pageY;

  }.bind(this);
};