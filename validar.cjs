const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");
const source = readFileSync(require("node:path").join(__dirname,"index.html"),"utf8");
const script = source.split("<script>")[1].split("const modes=")[0];
const { K, EPS, electric, magnetic, capacitor, circuit, rc, boris, norm } =
  vm.runInNewContext(script + "\n({ K, EPS, electric, magnetic, capacitor, circuit, rc, boris, norm });");

function near(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance,
    "Esperado " + expected + ", obtenido " + actual);
}

const isolated = electric([2,0,0],[{p:[0,0,0],q:4}]);
near(isolated.v, K*2e-9);
near(isolated.e[0], K*1e-9);
const dipole = electric([0,1,0],[{p:[-1.25,0,0],q:4},{p:[1.25,0,0],q:-4}]);
near(dipole.v,0);
near(dipole.e[0],21.91016,.00001);
assert.ok(Number.isNaN(electric([0,0,0],[{p:[0,0,0],q:4}]).v));

const plates = capacitor(.04,.004,4,12);
near(plates.c,40*EPS,1e-20);
near(plates.u,72*plates.c,1e-18);

for (const [kind,resistance] of [["series",650],["parallel",1/(1/100+1/220+1/330)],["mixed",232]]) {
  const c = circuit(kind,[100,220,330],12);
  near(c.req,resistance);
  near(c.branches.reduce((sum,b)=>sum+b.p,0),c.p);
  if (kind !== "series") near(c.i,kind==="mixed"?c.branches[1].i+c.branches[2].i:c.branches.reduce((sum,b)=>sum+b.i,0));
}
const transient = rc(100,100e-6,12,.01);
near(transient.tau,.01);
near(transient.vc,12*(1-1/Math.E));
near(transient.i,12/(100*Math.E));

near(magnetic([1,0,0],"wire",12)[2],-2.4e-6,1e-12);
near(magnetic([1,0,0],"wire",-12)[2],2.4e-6,1e-12);
near(magnetic([0,2,0],"magnet",12)[1],3e-7,1e-12);

let particle={p:[0,0,0],v:[1.8,0,0]};
for(let i=0;i<3000;i++) particle=boris(particle.p,particle.v,[0,0,0],[0,0,2],.35,.004);
near(norm(particle.v),1.8,1e-10);
particle={p:[0,0,0],v:[0,0,0]};
for(let i=0;i<250;i++) particle=boris(particle.p,particle.v,[4,0,0],[0,0,0],.35,.004);
near(particle.v[0],1.4);
near(particle.p[0],.7,.003);
console.log("Pruebas de electricidad, capacitancia, circuitos, magnetismo y dinámica: correctas.");


