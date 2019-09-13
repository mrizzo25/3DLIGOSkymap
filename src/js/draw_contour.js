
function linInterp(x, x_vals, y_vals) {

	for (var i = 0; i < x_vals.length-1; i++){
		if (x > x_vals[i+1]) {
			var m = (y_vals[i+1] - y_vals[i]) / (x_vals[i+1] - x_vals[i])
			var b = y_vals[i+1] - m * x_vals[i+1]	
			
			return m*x + b
		}
	}

}


function saveFile(strData, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
                document.body.appendChild(link); //Firefox requires the link to be in the body
                link.download = filename;
                link.href = strData;
                link.click();
                document.body.removeChild(link); //remove the link when done
        } else {
                console.log("can't save file");
                return;
                //location.replace(uri);
        }

};


function calcCI() {


	var level = linInterp(params.ci/100., params.integral, params.integral_x);


	console.log(params.integral);
	console.log(params.integral_x);
	console.log(level);

	var d3 = Plotly.d3;
	var img_jpg= d3.select('#jpg-export');


	var data = [{
	
		z: params.z_data, 
		x: params.x_data,
		y: params.y_data, 
		type: 'contour', 
		showscale: false,
		colorscale: 'Electric', 
		line: {
			width: 8,
		},
		contours: {
			coloring: 'lines',
			start: level, 
			end: level,
			size: level
		}
	
	}];


	var layout = {
		xaxis: {range: [2.*Math.PI, 0.], 
			zeroline: false,
			showgrid: false},

		yaxis: {range: [-1.*Math.PI, Math.PI],
			showgrid:false, 
			zeroline:false},

 		 paper_bgcolor: 'rgba(0,0,0,0)',
 		 plot_bgcolor: 'rgba(0,0,0,0)',

  		margin: {
    		l: 0,
    		r: 0,
    		b: 0,
    		t: 0,
    		pad: 0
  		}
	};


	var contour_fname = params.event_name+"_"+params.ci+"_contour.png"
	Plotly.newPlot('plotlyChart', data, layout).then( function(gd) {
      
		Plotly.toImage(gd, {width: 8192., height: 4095.})
         .then( function(url) {
             	img_jpg.attr("src", url);

		saveFile(url.replace('image/png', 'image/octet-stream'), contour_fname);

		//return Plotly.toImage(gd,{format:'jpeg',height:300,width:300});
         	}
         )
    	});

};





//this will draw the scene (with lighting)
function drawScene(){


	var contour_fname = "src/textures/"+params.event_name+"_"+params.
ci+"_contour.png"


	smap_contour = new THREE.TextureLoader().load(contour_fname);
	

        smap = new THREE.TextureLoader().load("src/textures/shifted_star_map.jpg");

        
	//draw the sphere
        params.material = new THREE.MeshBasicMaterial( {
                //emissive: 0x072534, 
                side: THREE.DoubleSide,
                //flatShading: false,
                map: smap,
                //transparent: false, 
                //opacity: 1.0
                });
        params.drawSphere();




	//draw the sphere
        params.contour_material = new THREE.MeshBasicMaterial( {
                //emissive: 0x072534,
                side: THREE.BackSide,
                transparent: true,
                opacity: 0.8,
                //color: 0xFF0000,
                //flatShading: false,
                map: smap_contour,
                //transparent: false,
                //opacity: 1.0
                });
        params.drawContourSphere();

	if (params.rd_axes == true) {
		smap_axes = new THREE.TextureLoader().load("src/textures/celestial_grid_shifted.png");
	
		params.axes_material = new THREE.MeshBasicMaterial( {
                //emissive: 0x072534,
                	side: THREE.BackSide,
                	transparent: true,
                	opacity: 0.9,
                	//color: 0xFF0000,
                	//flatShading: false,
                	map: smap_axes,
                	//transparent: false,
                	//opacity: 1.0
                	});
        	params.drawAxesSphere();
	
	} 
	
	else {
	
		params.axes_material = new THREE.MeshBasicMaterial( {
                //emissive: 0x072534,
                        //side: THREE.BackSide,
                        transparent: true,
                        opacity: 0.9,
                        //color: 0xFF0000,
                        //flatShading: false,
                        //map: smap_axes,
                        //transparent: false,
                        //opacity: 1.0
                        });
                params.drawAxesSphere();
	
	}

        //lights
        //var lights = [];
        //lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        //lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        //lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        //lights[ 0 ].position.set( 0, 200, 0 );
        // lights[ 1 ].position.set( 100, 200, 100 );
        // lights[ 2 ].position.set( - 100, - 200, - 100 );

        //lights.forEach(function(element){
        //      params.scene.add(element);
        //})


}

function checkImg(){

	return new Promise(function (resolve, reject){
	
		console.log("Checking image");
		const img = new Image();
		img.src = "src/textures/"+params.event_name+"_"+params.ci+"_contour.png";
		img.onload = () => resolve("Image Exists");
		img.onerror = () => reject("Image does not exist");
	
	});
};



function drawAll(){
	

	let checkPromise = checkImg();

	checkPromise.then(function(result){
		console.log(result);
		}, 
	function(error){
	
		console.log(error);
		calcCI();

	}).then(function(result){
		console.log("drawing");
		setTimeout(drawScene, 3000);
	
	}, function(error){
	
	});

}



