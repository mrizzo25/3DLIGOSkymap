function createUI(){

      params.gui = new dat.GUI();
      params.gui.add( params, 'event_name', params.GWEventOptions).onChange(function(){loadData();  drawAll();}).name("Event Name");
      params.gui.add( params, 'ci', 10, 99).onChange(drawAll).name("CI");
      params.gui.add( params, 'rd_axes').onChange(drawAll).name("Axes");	

}

