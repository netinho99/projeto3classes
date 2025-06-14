# projeto3classes
Esse projeto/treinamento/estudos eu vi no youtube e criei o código junto em 5 aulas vou resumir:

link para o site: https://projeto3classes.vercel.app

🎮 Projeto: Bolinhas Animadas no Palco

Este projeto cria várias bolas coloridas e animadas dentro de uma área (palco), onde elas se movimentam, colidem entre si e com as bordas da tela. Você pode adicionar e remover essas bolas usando botões.
🧠 Explicação do Código JavaScript
1. Referência dos Elementos HTML

const palco = document.getElementById("palco");
const num_objetos = document.getElementById("num_objetos");
const txt_qtde = document.getElementById("txt_qtde");
const btn_add = document.getElementById("btn_add");
const btn_remover = document.getElementById("btn_remover");

Aqui pegamos os elementos da página: o palco onde as bolas se movimentam, o campo de quantidade, e os botões para adicionar ou remover bolas.
2. Variáveis Globais

let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBola = 0;

Essas variáveis guardam o tamanho do palco, o array de bolas criadas e o contador de bolas ativas.
3. Classe Bola

A classe Bola define o comportamento de cada bolinha.
🔸 Construtor

constructor(arrayBolas, palco) {
    this.tam = Math.floor(Math.random() * 15) + 10;
    ...
    this.desenhar();
    this.controle = setInterval(this.controlar, 10);
    this.eu = document.getElementById(this.id);
}

Cada bola é criada com:

    Um tamanho aleatório (10 a 25px),

    Cores aleatórias (RGB),

    Velocidade e direção também aleatórias,

    Um setInterval para movimentar a bola a cada 10ms.

🔸 Método desenhar()

desenhar = () => {
  const div = document.createElement("div");
  div.setAttribute("id", this.id);
  div.setAttribute("class", "bola");
  div.setAttribute("style", `...`);
  this.palco.appendChild(div);
}

Esse método cria a bolinha na tela como uma <div> com estilo border-radius: 50%, ou seja, um círculo.
🔸 Método controlar()

controlar = () => {
  this.controle_bordas();
  this.px += this.dirx * this.velx;
  this.py += this.diry * this.vely;
  ...
}

Esse método move a bolinha, verifica colisões com bordas e outras bolas, e atualiza sua posição.
🔸 Método controle_bordas()

Verifica se a bola encostou nas bordas ou colidiu com outra bola:

if (this.px + this.tam >= larguraPalco) this.dirx = -1;
if (this.py + this.tam >= alturaPalco) this.diry = -1;

Colisão entre bolas: calcula distância entre centros e inverte a direção se houver sobreposição.
🔸 Método remover()

remover = () => {
  clearInterval(this.controle);
  this.eu.remove();
  ...
}

Remove a bolinha da tela e do array global bolas.
4. Eventos dos Botões

btn_add.addEventListener("click", () => {
    const qtde = parseInt(txt_qtde.value);
    for (let i = 0; i < qtde; i++) {
        bolas.push(new Bola(bolas, palco));
    }
});

Cria várias bolinhas com base no número informado.

btn_remover.addEventListener("click", () => {
    bolas.forEach((b) => {
        b.remover();
    });
});

Remove todas as bolas da tela.
🎨 Estilo CSS (exemplo)

Aqui vai um CSS básico para deixar o palco e as bolas visíveis e funcionais:
📁 style.css

body {
  font-family: sans-serif;
  background-color: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

#palco {
  width: 800px;
  height: 500px;
  background-color: #1e293b;
  border: 2px solid #38bdf8;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}

.bola {
  position: absolute;
  border-radius: 50%;
  transition: all 0.05s linear;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 10px;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
}

button {
  padding: 10px 15px;
  background-color: #38bdf8;
  border: none;
  color: #0f172a;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #0ea5e9;
}

#num_objetos {
  font-weight: bold;
  color: #38bdf8;
  margin-left: 5px;
}

🧩 Estrutura HTML (resumida)

Para funcionar tudo, o HTML precisa conter os seguintes elementos:

<div class="controls">
  <label>Quantidade:</label>
  <input type="number" id="txt_qtde" value="5" min="1" max="100">
  <button id="btn_add">Adicionar</button>
  <button id="btn_remover">Remover Tudo</button>
  <span>Bolas: <span id="num_objetos">0</span></span>
</div>

<div id="palco"></div>
