import './style.css';

let canvas = null;
let gl = null;
let lastUpdate = null;
let timer = 0.0;
let time = null;
let resolutionLocation = null;

let program = null;

let vertexShader = null;
let fragmentShader = null;

let texture;

const textPath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/51676/noise.png';

const getImage = (source, loadCallback) => {
    const img = new Image();
    img.onload = () => { loadCallback(img); };
    img.crossOrigin = 'Anonymous';
    img.src = source;
};

function init() {
    initScene();

    getImage(textPath, (e) => {
        texture = loadTexture(gl, e);
        initializeShaders();
        initializeProgram();
        initializeModel();
        requestAnimationFrame(loop);
    });

    window.addEventListener('resize', onResize);
}

function initScene() {
    canvas = document.createElement("canvas");
    const height = window.innerHeight;
    const width = window.innerWidth;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    document.body.appendChild(canvas);
    gl = canvas.getContext("webgl") || canvas.getContext('experimental-webgl');
    if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}

function loop(timestamp) {
    requestAnimationFrame(loop);

    const currentTime = Date.now();
    const timeSinceLastUpdate = currentTime - lastUpdate;
    lastUpdate = currentTime;

    render(timeSinceLastUpdate);
}

function render(timeDelta) {
    timer += timeDelta ? timeDelta / 1000 : 0.05;
    gl.uniform1fv(time, [timer]);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function initializeModel() {
    // create rectangle
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);

    // vertex data
    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // passing resolution to the shader
    resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    var usampler = gl.getUniformLocation(program, 'uSampler');
    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);

    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(usampler, 0);

    //init time
    time = gl.getUniformLocation(program, "time");
    lastUpdate = new Date().getTime();
}

function initializeShaders() {
    const vertShader = `
#define GLSLIFY 1
attribute vec4 a_position;
varying vec4 vUv;
void main() {
    vUv = a_position;
    gl_Position = a_position;
}
`;
    const fragShader = `

precision highp float;
#define GLSLIFY 1

#define PI 3.1415926535897932384626433832795
#define HALF_PI 1.57079632679

#define STARFIELD 15

uniform vec2 u_resolution;
uniform float time;
uniform sampler2D uSampler;

varying vec4 vUv;

vec4 Stars( in ivec2 x )
{
	return texture2D( uSampler, (vec2(x)+0.5)/256.0, 1.0 );
}

void main()
{

    vec2 newCoord = vUv.xy;
    float sin_factor = sin(time);
    float cos_factor = cos(time);
    newCoord = (newCoord - 0.5) * mat2(cos_factor, sin_factor, -sin_factor, cos_factor);
    newCoord += 0.5;

    vec2 coord = vUv.xy;
    coord = vUv.xy * mat2(sin(PI), sin(PI), -sin(PI), -cos(PI));
    coord = coord * sin(time*.5);

	vec3 d;
	d = vec3(newCoord + coord * (u_resolution.xy * vUv.xy)/u_resolution.xy, 1.0); 
		
	float speed = (sin(time * .5) + 1.1) * 2.0;
    float offset = time * .5;
	offset += cos(offset)*.9;
	offset *= 20.0;
	
	vec3 color = vec3(0); //if not set to 0 it will crash on certain GPU's
	
	vec3 loop = d/max(abs(d.x),abs(d.y));
	
	vec3 pos = 2.0*loop+.5;
	for ( int i=0; i < STARFIELD; i++ )
	{
		float z = Stars(ivec2(pos.xy)).x;
		z = fract(z - offset); //movement
        
		float c = 50.0 * z-pos.z;
		float a = pow(
            max(
                0.0,
                1.0-7.0*length(fract(pos.xy)-.5)
            ),2.0);
		vec3 b = max(
            vec3(0),
            vec3(
                1.0 - abs(c-speed*sin(time*.5))/(speed + 1.0),
                1.0 - abs(c)/(speed + 1.0),
                1.0 - abs(c+speed*sin(time*.5))/(speed + 1.0)
            )
        );
		color += a*b*1.4;
		pos = pos + loop;
	}
	
	gl_FragColor = vec4(pow( color, vec3(1.0) ),1.0);
}
`;

    vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertShader);
    fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShader);
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        throw `An error occurred compiling the shaders: ${info}`;
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initializeProgram() {
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);
        throw `Could not compile WebGL program. ${info}`;
    } else {
        gl.useProgram(program);
    }
}

function onResize() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
}

function loadTexture(gl, img) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, img);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        // No, it's not a power of 2. Turn of mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    return texture;
}

function isPowerOf2(value) {
    return (value & value - 1) == 0;
}

init();