// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from "react-360-web";
import SimpleRayCaster from "simple-raycaster"
import WebVRPolyfill from "webvr-polyfill";
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options
  });

  const buttonsPanel = new Surface(800, 1050, Surface.SurfaceShape.Flat);
  const infoPanel = new Surface(600, 600, Surface.SurfaceShape.Flat);

  buttonsPanel.setAngle( -0.6 , 0)
  infoPanel.setAngle( 0.6 , 0)

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("ConnectedButtons", {
      /* initial props */
    }),
    // r360.getDefaultSurface()
    buttonsPanel
  );

  r360.renderToSurface(
    r360.createRoot("ConnectedInfo", {
    }),
    infoPanel
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("Hawaii.jpg"));
  r360.controls.clearRaycasters()
  r360.controls.addRaycaster(SimpleRayCaster)
}

window.React360 = { init };

