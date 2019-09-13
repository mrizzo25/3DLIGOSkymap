# 3DLIGOSkymap
View LIGO skymaps projected onto 3D celestial sphere!

## Motivation

2D LIGO skymaps are a little bit difficult to physically intepret - at least I think so. 
If you've never seen a LIGO skymap (aka: banana plot), they are essentially 2D projections
of a 3D map of the sky illustrating how well LIGO was able to localize a given gravitational
wave (GW) event. Visualizing those projections as regions on the sky is something that I personally
cannot do in my head. Which is why I though it would be useful


## Generating Localizaiton Contours

When LIGO detects a GW, the GW data is analysed using Bayesian parameter estimation techniques.
The result of this analysis is a set of posterior samples, the sample space of which includes
parameters which describe the sky location of GW source. 


## Visualizing Localization Contours


*Disclaimer: I am not even close to proficient in any of these languages/packages, so the code is a little
hacky*

In order to run the visualizer, you will need to enable automatic downloads in your browser of choice, and 
point the default save location to the `src/textures` folder contained in the repo. I realize this is
not the best way to do this, but hey it works. 

Then, you should be able to initialize an http server in the main directory - which contains `index.html` - 
and open the address to that server in a browser window. I use `python -m http.server` for initalizing 
the server.



## 



