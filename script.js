const palco = document.getElementById("palco");
const num_objetos = document.getElementById("num_objetos");
const txt_qtde = document.getElementById("txt_qtde");
const btn_add = document.getElementById("btn_add");
const btn_remover = document.getElementById("btn_remover");

let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBola = 0;

class Bola {
    constructor(arrayBolas, palco) {
        this.tam = Math.floor(Math.random() * 15) + 10;
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
        this.px = Math.floor(Math.random() * (larguraPalco - this.tam));
        this.py = Math.floor(Math.random() * (alturaPalco - this.tam));
        this.velx = Math.floor(Math.random() * 2) + 0.5;
        this.vely = Math.floor(Math.random() * 2) + 0.5;
        this.dirx = Math.floor(Math.random() * 10) > 5 ? 1 : -1;
        this.diry = Math.floor(Math.random() * 10) > 5 ? 1 : -1;
        this.palco = palco;
        this.arrayBolas = arrayBolas;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000);
        this.desenhar();
        this.controle = setInterval(this.controlar, 10);
        this.eu = document.getElementById(this.id);
        numBola++;
        num_objetos.innerHTML = numBola;
    }
    minhaPos = () => {
        return this.arrayBolas.indexOf(this);
    };
    remover = () => {
        clearInterval(this.controle);
        bolas = bolas.filter((b) => {
            return b.id !== this.id;
        });
        this.eu.remove();
        numBola--;
        num_objetos.innerHTML = numBola;
    };
    desenhar = () => {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "bola");
        div.setAttribute(
            "style",
            `left:${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b}); position: absolute; border-radius: 50%;`
        );
        this.palco.appendChild(div);
    };
    controle_bordas = () => {
        // colisão com bordas do palco
        if (this.px + this.tam >= larguraPalco) {
            this.dirx = -1;
        } else if (this.px <= 0) {
            this.dirx = 1;
        }
        if (this.py + this.tam >= alturaPalco) {
            this.diry = -1;
        } else if (this.py <= 0) {
            this.diry = 1;
        }
        for (let outraBola of this.arrayBolas) {
            if (outraBola.id !== this.id) {
                let dx = (this.px + this.tam / 2) - (outraBola.px + outraBola.tam / 2);
                let dy = (this.py + this.tam / 2) - (outraBola.py + outraBola.tam / 2);
                let distancia = Math.sqrt(dx * dx + dy * dy);
                if (distancia < (this.tam / 2 + outraBola.tam / 2)) {
                    // Inverter direção (simples)
                    this.dirx *= -1;
                    this.diry *= -1;
                    outraBola.dirx *= -1;
                    outraBola.diry *= -1;
                }
            }
        }
    };
    controlar = () => {
        this.controle_bordas();
        this.px += this.dirx * this.velx;
        this.py += this.diry * this.vely;
        this.eu.setAttribute(
            "style",
            `left:${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b}); position: absolute; border-radius: 50%;`
        );
        if (this.px > larguraPalco || this.py > alturaPalco) {
            this.remover();
        }
    };
}
window.addEventListener("resize", () => {
    larguraPalco = palco.offsetWidth;
    alturaPalco = palco.offsetHeight;
});
btn_add.addEventListener("click", () => {
    const qtde = parseInt(txt_qtde.value);
    for (let i = 0; i < qtde; i++) {
        bolas.push(new Bola(bolas, palco));
    }
});
btn_remover.addEventListener("click", () => {
    bolas.forEach((b) => {
        b.remover();
    });
});
