---
title: Breve introducción a CSS
date: 2019-06-05 02:29:30
description: Resumen de características de CSS
category: CSS
tags: [CSS]
draft: true
---

![CSS Logo](./css-logo.png)

> Junto a otros compañeros debemos realizar una presentación acerca de CSS,
> guías de estilo más concretamente, para Arquitectura de la Información en
> Entornos Web de la Universidad Tecnológica Nacional por lo que se nos ocurrió
> publicar el mismo informe aquí.

La introducción es una recopilación de conceptos interesantes encontrados
navegando por la web. Luego de esta se presentan ejemplos propios de diversas
características de CSS y algunos casos concretos en que estas se aplican.

## Guía de Estilo

Una guía de estilo o manual de estilo es un **conjunto de estándares** para la
escritura, el formato y el diseño de documentos. Estos estándares pueden ser
aplicados tanto para usos generales o en un campo específico.

Sus usos abarcan desde documentos escritos a mano hasta documentos digitales. Su
principal función es establecer el aspecto visual de los mismos.

Las guías de estilo establecen, además, los requerimientos de estilo para
mejorar la comunicación, asegurando la consistencia tanto dentro de un mismo
documento como a través de múltiples documentos.

Estas abarcan desde la puntuación, capitalización, el formato de números y
fechas, la apariencia de tablas, hasta colores, tamaños y formas de cada
elemento dentro de un documento. A su vez, requiere del uso de buenas prácticas
e incluso fuerzan a que así sea.

Por ejemplo, *Interinstitutional style guide*, la cual abarca 24 lenguajes de la
Unión Europea, es una guía de estilo en lo referente a la escritura y uso de los
lenguajes más populares. Este manual es obligatorio para todos aquellos
empleados de distintas instituciones de la Unión Europea encargados de preparar
documentos y trabajos referentes a la misma.

En este informe se hablará específicamente del estándar de guías de estilo que
domina la web y los navegadores alrededor del mundo: CSS.

# Introducción

## ¿Qué es CSS?

Antes de comenzar hay que tener en claro que una página web es realmente un
documento de texto. En dicho documento se escribe código HTML, con el que se que
crea el contenido de una web. Por otro lado, existe CSS, que unido al código
HTML permite darle forma, color, posición (y otras características visuales) a
una página.

CSS es un estándar y a su vez la implementación del mismo en forma de lenguaje.
Es un lenguaje utilizado en hojas de estilo para describir la presentación de un
documento escrito en algún lenguaje de marcado o maquetado, como HTML. Describe
cómo los elementos HTML son mostrados en pantalla (o incluso en papel u otro
medio).

CSS es la abreviación de *Cascading Style Sheets*. Este ahorra mucho trabajo ya
que puede establecer el estilo de múltiples páginas web al mismo tiempo. Es
decir, no está vinculado directamente a una web en particular. Los estilo se
guardan en archivos con extensión *.css*.

HTML nunca fue pensado para contener etiquetas para formatear una página web.
HTML fue creado para describir el contenido de esta. Por ejemplo:

```html
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
```

Cuando las etiquetas como `<font>` y atributos de color fueron agregadas a la
especificación HTML 3.2 , comenzó a ser un problema para los desarrolladores
web. El desarrollo de grandes sitios web donde la información de fuentes y
colores era agregada a cada página en particular se volvió un largo y caro
proceso. Además, asignarle tamaño y posición a cada elemento particular era un
caos.

Para resolver este problema, la [World Wide Web
Constortium](https://www.w3schools.com/css) (W3C) creó CSS. El mismo que removió
el estilo y formato de una página HTML para llevarlo a un archivo distinto.

Lo anterior mencionado, hoy en día, se denomina **separation of concepts**. Es
decir, se separa la lógica e información de una aplicación (incluso cualquier
página web) de acuerdo a la función que realiza o brinda.

De esta forma:

- **HTML** se utiliza exclusivamente para maquetar el contenido y asignarle
semántica a cada elemento.
- **CSS** se utiliza exclusivamente para asignar el estilo: color, tamaño,
posición, formato, étc. a un elemento o un conjunto de ellos.
- **Javascript** se utiliza principalmente para dotar a la página web de lógica,
de dinamismo. Es un lenguaje muy interesante.

Con los anteriores lenguajes se construye cualquier sitio web.

Algo importante a resaltar es que hoy en día existen múltiples navegadores web,
los cuales pueden llegar a ser muy distintos. CSS es un estándar, por lo tanto
todo navegador debe respetarlo, es decir, la misma página web debe verse igual
en cualquier navegador. O mejor dicho, CSS debe ser interpretado de la misma
forma en todos, más allá del motor o intérprete de CSS que utilicen. Gracias a
esto, la misma página web se verá igual (en realidad, similarmente ya que aún
hay discrepancias entre algunos navegadores) en cualquier dispositivo utilizado
para accederla.

## Ejemplo

```css
body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}
```

## En general

```css
selector-de-elemento {
  prop1: valor;
  prop2: valor;
  ...
}
```

Como se observa la estructura del lenguaje es muy simple. Aunque con el tiempo
ha ido evolucionando y agregando nuevas características.

Una regla CSS consiste de un selector y un bloque de declaración:

![Selector CSS](./selector.gif)

El selector apunta al elemento HTML al que se desea asignar estilo. El bloque de
declaración contiene una o más declaraciones separadas por punto y coma. Cada
declaración incluye una propiedad CSS con la estructura nombre y valor,
separadas por dos puntos. Un bloque de declaración siempre se encierra entre
llaves..

## Selector

Los selectores son usados para “encontrar” o seleccionar elementos HTML
basándose en su nombre, id, clase/s, atributo/s entre otras propiedades. De esta
forma asignarle a los mismos un estilo declarado a través de CSS.

### Por nombre

Se basa en el nombre del elemento. En este caso, en el nombre de la etiqueta.

```css
p {
  text-align: center;
  color: red;
}
```

### Por ID

Utiliza el atributo **id** de un elemento HTML.
 
Este atributo debe ser único dentro de una misma página. De esta forma, este
selector es utilizado para seleccionar el único elemento existente con ese id.
 
Se utiliza un hash (#) más el id.
 
El siguiente ejemplo serviría para seleccionar un elemento HTML:

```html
<p id="p1">Texto</p>
```

```css
#p1 {
  text-align: center;
  color: red;
}
```

### Por clase

Se selecciona el elemento por la propiedad **class** de un elemento.

A diferencia del ID un elemento HTML puede contener múltiples clases y las
clases pueden ser usadas en múltiples elementos.

Para seleccionar un elemento se antepone un punto (.) antes del nombre de la
clase.

En el siguiente ejemplo todos los elementos HTML que contengan la clase *center*
se les asignará el estilo: color ojo y alineados en el centro.

```css
.center {
  text-align: center;
  color: red;
}
```

Se podrán tener múltiples elementos a los que asignar esta clase para aplicarles
el estilo definido.

```html
<h1 class="center">Título</h1>
<p class="center">Párrafo</p>
```

Otro ejemplo podrían ser múltiples clases con estilos muy específicos y
utilizarlas en conjunto en un mismo elemento.

```css
.center {
  text-align: center;
}

.red {
  color: red;
}
```

```html
<!-- Centrado y en color rojo -->
<p class="center red">Texto</p>

<!-- Solamente centrado -->
<h1 class="center">Título</h1>

<!-- Solamente rojo -->
<h1 class="red">Título</h1>
```

> Como ya habrás pensado, esto da lugar a la generación de **frameworks** que
> faciliten el trabajo.

### Agrupar selectores

Se puede definir el mismo bloque de estilo para múltiples selectores.

Supongamos que tenemos los siguientes estilos:

```css
h1 {
  text-align: center;
  color: red;
}

h2 {
  text-align: center;
  color: red;
}

p {
  text-align: center;
  color: red;
}
```

Como se puede ver, todos comparten el mismo estilo, por lo que podrían agruparse
de la siguiente forma (separados por comas):

```css
h1, h2, p {
  text-align: center;
  color: red;
}
```

## Comentarios

Como en todo lenguaje *de programación*, soporta comentarios. Los mismos son
usados para explicar el código y ayudan en futuras ediciones del mismo.

Un comentario comienza por `/*` y termina con `*/`.

```css
p {
  color: red;
  /* Comentario de una línea */
  text-align: center;
}

/* Comentario de 
múltiples
líneas */
```

# ¿Cómo insertar CSS?

## CSS externo

Con una hoja de estilo externa es posible cambiar el aspecto de un sitio web
entero, solamente agregando una fila.

Cada página debe incluir una referencia a la hoja de estilos externa utilizando
una etiqueta del tipo `<link>` (dentro de la etiqueta `<head>`).

```html
<head>
  <link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

## CSS interno

El mismo se especifica dentro de una página haciendo uso de la etiqueta
`<style>`. Directamente en el HTML.

Generalmente se utiliza cuando una página tiene un estilo único. Aunque en la
práctica este método es poco utilizado.

```html
<head>
  <style>
  body {
    background-color: linen;
  }

  h1 {
    color: maroon;
    margin-left: 40px;
  } 
  </style>
</head>
```

## Estilo *inline*

Se utiliza como atributo de una etiqueta. Un estilo *inline* debería ser
utilizado para aplicar un estilo único a un elemento.

El atributo puede contener cualquier propiedad CSS.

```html
<h1 style="color:blue;margin-left:30px;">This is a heading</h1>
```

## Mútiples hojas de estilo

Se puede dar el caso en que múltiples propiedades sean definidas para el mismo
**selector** en distintas partes del código o en distintas hojas de estilo.

Por ejemplo, asumiendo que una hoja de estilo **externa** establece el siguiente
estilo:

```css
h1 {
  color: red;
}
```

Y el estilo **interno** asigna el estilo:

```css
h1 {
  color: blue;
}
```

Entonces... ¿Qué estilo se usaría? Todo depende del orden. El último estilo
definido sobrescribe a los anteriores.

En este caso, si el estilo interno es definido **después** del estilo externo,
entonces el estilo de `<h1>` establecerá un color azul. En caso contrario, donde
el estilo interno es definido **antes** del estlo externo, el estilo de un
elemento `<h1>` será de color rojo.

```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
<style>
h1 {
  color: orange; /* se aplicará este estilo */
}
</style>
</head>
```

Por el contrario:

```html
<head>
  <style>
  h1 {
    color: orange;
  }
  </style>
  <link rel="stylesheet" type="text/css" href="mystyle.css"> <!-- se aplicará este estilo -->
</head>
```

Esta *sobreescritura* de estilos se da a nivel de propiedades. Es decir, las que
se sobreescriben son puntualmente cada propiedad.

 ```css
 /* en un archivo css */
 h1 {
   text-align: center;
   color: red;
 }
 
 /* en otro archivo */
h1 {
  text-align: left;
}
 ```
 
 El estilo aplicado dependerá del orden en que se *importen* estas hojas de
 estilos. Suponiendo que se importan en el orden en que han sido declaradas,
 entonces el título `<h1>` estará alineado a la izquierda y será de color rojo.
 Esto debido a que el último `text-align` en aparecer es el que alinea el texto
 a la izquierda(*left*) y el color rojo nunca fue sobreeescrito.

## Entonces... ¿Excelente para usar frameworks?

Si nos paramos a pensar esto da lugar al uso de frameworks externos, y si algo
no nos gusta aplicamos nuestro propio estilo.

```html
<head>
  <link rel="stylesheet" type="text/css" href="bootstrap.css">
  <link rel="stylesheet" type="text/css" href="bulma.css">
  <link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

Podemos utilizar dos frameworks conocidos como
[bootstrap](https://getbootstrap.com/) y [bulma](https://bulma.io/) para tener a
nuestra disposición infinidad de clases que asignen estilos a elementos HTML. Y
además, si algo nos disgusta, cambiar el estilo a través de `mystyle.css` (es el
que sobreescribirá cualquier otra propiedad aplicada al mismo elemento por estar
definidio o importado al último).

¿Algún problema? Abosolutamente. Cada etiqueta `<link>` indica a nuestro
navegador que debe descargar y aplicar un nuevo estilo. Esto, por supuesto,
demanda cierto tiempo, lo cual hará que nuestro sitio web o la página utilizando
estos estilos demore más en cargar, lo cual es muy malo para el **SEO** de la
misma.
