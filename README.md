# Electromagnetismo en 3D

Simulador educativo de Física II, en español. Abre `index.html` en un navegador actual. Funciona localmente y sin instalar dependencias ni conectarse a Internet.

| Módulo | Contenido |
|---|---|
| Campo eléctrico | Hasta 10 cargas puntuales, líneas y vectores, equipotenciales 2D/3D, sonda y trayectoria |
| Capacitores | Placas paralelas, dieléctrico, carga, campo y energía |
| Circuitos | Serie, paralelo, mixto, curva de Ohm y carga de un circuito RC |
| Campo magnético | Imán dipolar, hilo recto infinito y movimiento en campos cruzados |

Arrastra el visor para girar y usa la rueda para cambiar el zoom. Con el visor enfocado, también puedes usar las flechas y las teclas + y −. En el módulo eléctrico, la vista 2D representa el plano Z = 0 y proyecta sobre él la trayectoria de la partícula.

El simulador trabaja en unidades SI y usa prefijos en la interfaz. El imán y el hilo aplican un q/m efectivo de demostración, indicado en el panel. Los modelos suponen fuentes ideales y una partícula de prueba.

Validación numérica con Node.js:

```sh
node validar.cjs
```

Las funciones físicas, los controles y el visor se encuentran en bloques separados dentro de `index.html` para permitir que el simulador se abra directamente.
