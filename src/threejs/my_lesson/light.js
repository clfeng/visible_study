import * as THREE from 'three';
import 'three-orbitcontrols';
/**
     * 创建场景对象Scene
     */
var scene = new THREE.Scene();
/**
 * 创建网格模型
 */
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
// var point = new THREE.PointLight(0xffffff);
// point.position.set(400, 200, 300); //点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
// scene.add(point); //点光源添加到场景中
//环境光    环境光颜色与网格模型的颜色进行RGB进行乘法运算
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// 渲染函数
function render() {
    renderer.render(scene, camera); //执行渲染操作
}
render();
//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
controls.addEventListener('change', render);