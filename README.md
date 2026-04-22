# Formulario con hijos

No es muy habitual que los formularios tengan elementos descendientes, pero, en este proyecto, lo vamos a hacer. Vamos a hacer un formulario que admita **varios tipos de archivos**, para ello, habrá una info común a todos los contenidos, que registraremos en el **formulario padre** como:

- Título del contenido

- Autor del mismo

- Fecha de creación que, para no complicarnos, será automática

Y una info específica en el **formulario hijo** para cada formato:

- Vídeos: enlace del vídeo de YouTube

- Audio: enlace del audio (de YouTube también, para simplificar)

- Texto: texto enriquecido, con un campo [wysiwyg](https://es.wikipedia.org/wiki/WYSIWYG "wysiwyg").

También elaboraremos una una **galería de contenidos** que almacenen dichos contenidos y que se visualizarán **en otra página**. Como no disponemos de un backend real, mantendremos estos contenidos con `localStorage`.