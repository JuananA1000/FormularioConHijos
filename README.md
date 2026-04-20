# Formulario con hijos

Es una practica poco habitual, pero, en este proyecto, vamos a hacer un formulario que admita varios archivos: vease texto, formatos de audios o vídeos o lo que sea. para ello, habrá una info comun a todos los contenidos (título, autor, etc...) y una info especifica para cada formato:

- Videos: archivo de video o link, lo que se permita

- Audio: igual que el video

- Texto: texto enriquecido, quiza con un campo [wysiwyg](https://es.wikipedia.org/wiki/WYSIWYG "wysiwyg").

"Subiremos" o intentaremos subir estos contenidos a la api de [JSONPlaceholder](https://jsonplaceholder.typicode.com/ "JSONPlaceholder").
También habra una galeria de contenidos que se almacenen en otra página para visualizarse pero, como no tenemos un backend real, lo haremos con `localStorage` o `sessionStorage`, ya veré.