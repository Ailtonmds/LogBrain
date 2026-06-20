const canvas = document.getElementById('bg-animado');
const ctx = canvas.getContext('2d');

function ajustarTamanho() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
ajustarTamanho();
window.addEventListener('resize', ajustarTamanho);

const particulas = [];
const quantidadeParticulas = 80; 


class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocidadeX = (Math.random() - 0.5) * 1.5; 
        this.velocidadeY = (Math.random() - 0.5) * 1.5; 
        this.tamanho = 2; 
    }

    // Desenha o pontinho na tela
    desenhar() {
        ctx.fillStyle = '#00d2ff'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fill();
    }

 
    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        if (this.x < 0 || this.x > canvas.width) this.velocidadeX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocidadeY *= -1;
    }
}


for (let i = 0; i < quantidadeParticulas; i++) {
    particulas.push(new Particula());
}

function conectarPontos() {
    for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
            const dx = particulas[i].x - particulas[j].x;
            const dy = particulas[i].y - particulas[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            
            if (distancia < 120) {
               
                let opacidade = 1 - (distancia / 120);
                ctx.strokeStyle = `rgba(0, 35, 101, ${opacidade * 0.5})`; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(particulas[j].x, particulas[j].y);
                ctx.stroke();
            }
        }
    }
}


function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    particulas.forEach(p => {
        p.atualizar();
        p.desenhar();
    });

    conectarPontos();
    requestAnimationFrame(animar); 
}

animar();