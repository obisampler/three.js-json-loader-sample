/*based on mad dogs tutorials youtube lesson and corrections by youtube user MrFreeman555*/
/*model by user yups12@tf3d.com*/
$( 
	function(){
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(32, window.innerWidth/window.innerHeight, .1, 500); //contruct using FOV, aspect ratio, near, far plane
		var renderer = new THREE.WebGLRenderer({antialias: true});

		renderer.setClearColor(0xdddddd);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
        //renderer.shadowMapSoft = true;
	

		//add helpers
		var axis = new THREE.AxisHelper(10);
		//scene.add(axis);	

		var grid = new THREE.GridHelper(50, 5);
        color = new THREE.Color("rgb(255,0,0)");
        grid.setColors(color, 0xff00ff);
        //scene.add(grid);
        
		var cubeGeometry = new THREE.BoxGeometry(5,5,5);
		var cubeMaterial = new THREE.MeshPhongMaterial( {
            color: 0xff0000,
            shininess: 150,
            specular: 0x222222,
            shading: THREE.SmoothShading
        } );

		 /*add loader call add model */
		var importedModel = new THREE.Mesh();
        loader = new THREE.JSONLoader();
        loader.load('http://localhost/resources/buildings-yups12@tf3d_com.json', addModel);
        

		/*add ground*/
		var groundGeometry = new THREE.BoxGeometry( 75, 0.1, 75 );
        var groundMaterial = new THREE.MeshPhongMaterial( {
            //color: 0xa0adaf,
            color: 0xf0f0f0,
            shininess: 150,
            specular: 0xffffff,
            shading: THREE.SmoothShading,
            opacity: 0.5,
            transparent: true

        } );

        var ground = new THREE.Mesh( groundGeometry, groundMaterial );
        ground.scale.multiplyScalar( 3 );
		ground.castShadow = false;
        ground.receiveShadow = true;
        scene.add(ground);

        //create canvas for text
		var canvas = document.createElement('canvas');
		// the larger these numbers, the larger the canvas, and
		// the smoother your final image can be. 
		canvas.width = 1024;
		canvas.height = 128;

		var context = canvas.getContext('2d');
		context.font = "Normal 30px Helvetica";
		//context.fillStyle = "rgba(255,102,204, 1)";
		context.fillStyle = "rgba(255,255,255, 0.8)";
		context.fillText('spot light * canvas * json loader * three.js * antialiasing * shadows * ambient lights', 10, 100);

		// use canvas contents as a texture
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true;

		var textMaterial = new THREE.MeshBasicMaterial( {
  			map: texture, 
  			side:THREE.DoubleSide
		} );
		var textGeometry = new THREE.BoxGeometry( 100, 0.1, 10 );
		var text = new THREE.Mesh(textGeometry, textMaterial);
		text.castShadow = false;
		text.receiveShadow = true;
		text.position.z = -25;
		scene.add(text);

         /*add lights*/
        var ambient = new THREE.AmbientLight( 0x505050 );
        scene.add(ambient);

        var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set(20, 20, 20);
        spotLight.castShadow = true;
        spotLight.shadowCameraNear = 8;
        spotLight.shadowCameraFar = 50;
        spotLight.shadowDarkness = 0.8;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
		spotLight.name = 'Spot Light';
		scene.add(spotLight);

		camera.position.x = 40;
		camera.position.y = 40;
		camera.position.z = 40;
		camera.lookAt(scene.position);

		var guiControls = new function(){
			this.rotation_speed = 0.01; 
		}

		var datGui = new dat.GUI();
		datGui.add(guiControls, 'rotation_speed', 0, 0.05);

		function render(){
			importedModel.rotation.y += guiControls.rotation_speed;

			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}

		function addModel(geometry, materials){
        	var material = new THREE.MeshFaceMaterial(materials);
        	model = new THREE.Mesh(geometry, material);
        	model.scale.set(3,3,3);
        	model.position.set(0,0,0);
        	model.castShadow = true;
        	model.receiveShadow = false;
        	scene.add(model);   
        	importedModel = model;         
   		}
		

		$("#glContainer").append(renderer.domElement);
		//renderer.render(scene, camera);

		render();

	}	
);