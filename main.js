var juego = new Phaser.Game(1280,700, Phaser.CANVAS, 'canvas');

var fondo, music;
var personajes = [];
var velocidad = 4;

var ANCHO = 1280;
var ALTO = 700;
var SPRITE = 96; // <-- NUEVO TAMAÑO DEL SPRITE

var PrimerEdo = {

    preload: function(){
        juego.load.image('fondo','img/fondo2.jpg');
        juego.load.audio('roluki','audio/rolitachafa.mp3');
        juego.load.spritesheet('monito','img/dbz.png',96,96); // <-- NUEVO
        juego.load.spritesheet('btn1', 'img/botones.png', 193, 71); 
    },

    create: function(){

        fondo = juego.add.tileSprite(0,0,ANCHO,ALTO,'fondo');

        // ---- MUSICA ----
        music = juego.add.audio('roluki');
        music.addMarker('intro',0,3,1,true);
        juego.input.onDown.addOnce(function(){
            music.play('intro');
        });

        // ---- BOTONES SEPARADOS ----
        var centroX = ANCHO / 2;
        var centroY = ALTO / 2;
        var separacion = 110;

        var btnFueraB = juego.add.button(centroX, centroY - separacion, 'btn1', accionFuera, this, 0,1,2);
        btnFueraB.anchor.set(0.5);

        var btnEncimaB = juego.add.button(centroX, centroY, 'btn1', accionEncima, this, 0,1,2);
        btnEncimaB.anchor.set(0.5);

        var btnPresionadoB = juego.add.button(centroX, centroY + separacion, 'btn1', accionPresionado, this, 0,1,2);
        btnPresionadoB.anchor.set(0.5);

        // ---- PERSONAJES ----
        personajes.push(crearPersonaje(0, 0, 'derecha', [0,1,2,3,4,5]));
        personajes.push(crearPersonaje(ANCHO - SPRITE, 0, 'abajo', [0,1,2,3,4,5]));
        personajes.push(crearPersonaje(ANCHO - SPRITE, ALTO - SPRITE, 'izquierda', [6,7,8,9,10,11]));
        personajes.push(crearPersonaje(0, ALTO - SPRITE, 'arriba', [6,7,8,9,10,11]));

        // ===== TEXTOS =====
        var text;

        text = juego.add.text(0,0,'Yulieth Rivera',{font:'bold 50px Arial',fill:"#fff000"});
        text.setTextBounds(350,310,800,310);

        text = juego.add.text(0,0,'Azzeneth Garcia',{font:'bold 32px Arial',fill:"#41dd87"});
        text.setTextBounds(550,0,370,310);

        text = juego.add.text(0,0,'Roman Ocampo',{font:'bold 32px Arial',fill:"#d63de0"});
        text.setTextBounds(1000,0,2200,1000);

        text = juego.add.text(0,0,'Julian Escorcia',{font:'bold 32px Arial',fill:"#574283"});
        text.setTextBounds(20,0,1300,310);

        text = juego.add.text(0,0,'Giovanni Mitchell',{font:'bold 32px Arial',fill:"#c1262b"});
        text.setTextBounds(20,320,400,310);

        text = juego.add.text(0,0,'Sonia Roman',{font:'bold 32px Arial',fill:"#48b14c"});
        text.setTextBounds(20,600,400,310);

        text = juego.add.text(0,0,'Kung Lao',{font:'bold 32px Arial',fill:"#4a4ace"});
        text.setTextBounds(1060,320,2200,310);

        text = juego.add.text(0,0,'Naomi Sarai',{font:'bold 32px Arial',fill:"#d99a4d"});
        text.setTextBounds(550,600,1300,310);

        text = juego.add.text(0,0,'Nick Cañon',{font:'bold 32px Arial',fill:"#91506d"});
        text.setTextBounds(1060,600,2200,310);

        personajes.forEach(p => juego.world.bringToTop(p));
    },

    update: function(){
        fondo.tilePosition.x -= 0.5;
        personajes.forEach(p => moverInfinito(p));
    }
};

// ===== FUNCIONES =====

function crearPersonaje(x,y,dir,frames){
    var p = juego.add.sprite(x,y,'monito');

    // MIRANDO AL FRENTE
    p.frame = 0;
    p.anchor.set(0.5);

    // animacion
    p.animations.add('walk',frames,10,true);
    p.animations.play('walk');

    // voltear si va a la izquierda
    if(dir === 'izquierda'){
        p.scale.x = -1;
    }

    p.dir = dir;
    return p;
}

function moverInfinito(p){

    if(p.dir === 'derecha'){
        p.x += velocidad;
        if(p.x > ANCHO) p.x = -SPRITE;
    }
    else if(p.dir === 'izquierda'){
        p.x -= velocidad;
        if(p.x < -SPRITE) p.x = ANCHO;
    }
    else if(p.dir === 'abajo'){
        p.y += velocidad;
        if(p.y > ALTO) p.y = -SPRITE;
    }
    else if(p.dir === 'arriba'){
        p.y -= velocidad;
        if(p.y < -SPRITE) p.y = ALTO;
    }
}

// ---- ACCIONES DE BOTONES ----

function accionFuera(){
    console.log("BOTON FUERA");
    velocidad = 2;
}

function accionEncima(){
    console.log("BOTON ENCIMA");
    velocidad = 6;
}

function accionPresionado(){
    console.log("BOTON PRESIONADO");
    velocidad = 10;
}

var SecundoEdo = {
    preload: function(){
        juego.load.image('fondo','img/fondo2.jpg');
        juego.load.audio('roluki','audio/rolitachafa.mp3');
        juego.load.spritesheet('monito','img/dbz.png',96,96);
        juego.load.spritesheet('btn1', 'img/botones.png', 193, 71); 
    },
    create: function(){},
    update: function(){}  
};

// ---- INICIAR ----
juego.state.add('edouno',PrimerEdo);
juego.state.add('edodos',SecundoEdo);
juego.state.start('edouno');
