import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils.js';
import * as THREE from 'three';

import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import Stats from 'three/examples/jsm/libs/stats.module';

export const chapter2_4 = (div: HTMLDivElement, stats: Stats) => {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;

  window.addEventListener('resize', onResize, false);

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(-10, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x090909);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, 50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    addGeometries(scene);

    // add the output of the renderer to the html element
    div.appendChild(renderer.domElement);

    function addGeometries(scene: THREE.Scene) {
      const geometries = [];

      geometries.push(new THREE.CylinderGeometry(1, 4, 4));
      geometries.push(new THREE.BoxGeometry(2, 2, 2));
      geometries.push(new THREE.SphereGeometry(2));
      geometries.push(new THREE.IcosahedronGeometry(4));

      const points = [
        new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(2, 2, -2),
        new THREE.Vector3(-2, 2, -2),
        new THREE.Vector3(-2, 2, 2),
        new THREE.Vector3(2, -2, 2),
        new THREE.Vector3(2, -2, -2),
        new THREE.Vector3(-2, -2, -2),
        new THREE.Vector3(-2, -2, 2),
      ];
      geometries.push(new ConvexGeometry(points));

      const pts = [];
      const detail = 0.1;
      const radius = 3;
      for (let angle = 0.0; angle < Math.PI; angle += detail)
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
      geometries.push(new THREE.LatheGeometry(pts, 12));

      geometries.push(new THREE.OctahedronGeometry(3));
      geometries.push(new ParametricGeometry(ParametricGeometries.mobius3d, 20, 10));
      geometries.push(new THREE.TetrahedronGeometry(3));
      geometries.push(new THREE.TorusGeometry(3, 1, 10, 10));
      geometries.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

      let j = 0;
      for (let i = 0; i < geometries.length; i++) {
        const materials = [
          new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }),
          new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }),
        ];

        // @ts-ignore
        const mesh: THREE.Group = SceneUtils.createMultiMaterialObject(geometries[i], materials);
        mesh.traverse(function (e) {
          e.castShadow = true;
        });

        // const mesh = new THREE.Mesh(geometries[i], materials[i]);
        // mesh.castShadow = true;
        mesh.position.x = -24 + (i % 4) * 12;
        mesh.position.y = 4;
        mesh.position.z = -8 + j * 12;

        if ((i + 1) % 4 === 0) j++;
        scene.add(mesh);
      }
    }

    render();

    function render() {
      stats.update();

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
  }

  init();
};
