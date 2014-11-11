var FirstPersonCamera = function () {

  //Some options
  this.movementSpeed = 1;
  this.rotationSpeed = 0.02;
  //this.canFly = false;

  this.object = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 0.1, 1000);
  this.object.position.set(0,10,0);

  //For debugging purposes
  //var cubeGeometry = new THREE.CubeGeometry(4,4,4);
  //var cubeMaterial = new THREE.MeshPhongMaterial(
  //  {color: 0xff0000,specular: 0xffeeee,shininess: 100});
  //this.target = new THREE.Vector3(10,10,10);
  //this.target = new THREE.Mesh(cubeGeometry,cubeMaterial);
  //this.target = new THREE.Object3D();
  //this.target.position.set(10,10,10);
  this.target = new THREE.Vector3(10,10,10);

  this.rotation = 0;

  this.move = false;
  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.deltaX = 0;
  this.deltaZ = 0;
  this.lastPositionX = 0;
  this.lastPositionZ = 0;

  this.update = function () {
    this.lastPositionX = this.object.position.x;
    this.lastPositionZ = this.object.position.z;

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
      this.move = false;
      this.deltaX = this.object.position.x - this.lastPositionX;
      this.deltaZ = this.object.position.z - this.lastPositionZ;
      this.target.x += this.deltaX;
      this.target.z += this.deltaZ;
    }

    if (this.rotateLeft) {
      this.rotateLeft = false;
      this.rotation -= this.deltaRotationX*this.rotationSpeed;
      this.target.x = this.object.position.x+20*Math.cos(this.rotation);
      this.target.z = this.object.position.z+20*Math.sin(this.rotation);
    }

    if (this.rotateRight) {
      this.rotateRight = false;
      this.rotation += this.deltaRotationX*0.02;
      this.target.x = this.object.position.x+20*Math.cos(this.rotation);
      this.target.z = this.object.position.z+20*Math.sin(this.rotation);
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

  document.onmousemove = function(e) {

    if (e.pageX > lastPageX) {
      this.deltaRotationX = e.pageX - lastPageX;
      this.rotateRight = true;
    }
    if (e.pageX < lastPageX) {
      this.deltaRotationX = lastPageX - e.pageX;
      this.rotateLeft = true;
    }
    lastPageX = e.pageX;

  }.bind(this);
};