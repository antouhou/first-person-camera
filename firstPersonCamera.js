var FirstPersonCamera = function () {

  var camera = this.object = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 0.1, 1000);
  //Some options
  this.movementSpeed = 1;

  var self = this;

  this.position = {x: 0, y: 0, z: 0};
  this.target = new THREE.Vector3(0,10,0);

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.update = function () {
    if (this.moveForward) {
      camera.translateZ(-this.movementSpeed);
    }
    if (this.moveBackward) {
      camera.translateZ(this.movementSpeed);
    }
    if (this.moveLeft) {
      this.target.setX(this.target.x-this.movementSpeed);
      camera.translateX(-this.movementSpeed);
    }
    if (this.moveRight) {
      this.target.setX(this.target.x+this.movementSpeed);
      camera.translateX(this.movementSpeed);
    }

    //this.target.set(camera.position.x+10,10,camera.position.z+10);
    camera.lookAt(this.target);
  };

  //Биндим обработчики кнопок

  document.onkeydown = function (pressedKey) {
    console.log(pressedKey.keyCode);
    if (pressedKey.keyCode === 87) {
      this.moveForward = true;
    }
    if (pressedKey.keyCode === 83) {
      this.moveBackward = true;
    }
    if (pressedKey.keyCode === 65) {
      this.moveLeft = true;
    }
    if (pressedKey.keyCode === 68) {
      this.moveRight = true;
    }
  }.bind(this);

  document.onkeyup = function (pressedKey) {
    console.log(pressedKey.keyCode);
    if (pressedKey.keyCode === 87) {
      this.moveForward = false;
    }
    if (pressedKey.keyCode === 83) {
      this.moveBackward = false;
    }
    if (pressedKey.keyCode === 65) {
      this.moveLeft = false;
    }
    if (pressedKey.keyCode === 68) {
      this.moveRight = false;
    }
  }.bind(this);

  //TODO: Придумать нормальную функцию вращения камеры
  document.onmousemove = function(e) {
    self.target.set(20*Math.cos(e.pageX/300)+camera.position.x,($(window).height()-e.pageY)/20,20*Math.sin(e.pageX/300)+camera.position.z);
  };
};