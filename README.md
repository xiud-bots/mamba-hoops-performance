# Mamba Hoops Performance • Biomecânica & Blindagem Articular

Aplicação web moderna, interativa e responsiva para acompanhamento do **Programa de Preparação Física para Basquetebol (Fase 1 — Semanas 1 a 4)**, estruturada especificamente para o atleta Gabriel sob prescrição de `@mamba` (Head of Athletic Performance & Biomechanics da XIUD).

---

## 🏀 Visão Geral dos Módulos

1. **Treino A (Segunda-Feira) — Aceleração Linear & Força Bilateral:**
   - Primeiro passo explosivo, extensão potente de quadril e tração de solo com Trap Bar Deadlift.
   - Rigidez elástica de tornozelo (pogo jumps) e isolamento do sóleo sentado (zero dor na fossa poplítea).
2. **Treino B (Terça-Feira) — Potência de Membros Superiores, Rotação & Blindagem:**
   - Transferência de força rotacional de quadril (medicine ball slams e passes).
   - Estabilidade escapular e manguito rotador (supino com halteres, puxada alta e face pulls).
3. **Treino C (Quinta-Feira) — Impulsão Vertical & Força Unilateral:**
   - Absorção excêntrica e mecânica de aterrissagem suave (snap downs e CMJ sub-máximo).
   - Agachamento búlgaro com trava rigorosa a 90° e Single-Leg RDL para proteção posterior do joelho esquerdo.
4. **Treino D (Sexta-Feira — Opcional) — Agilidade, Deslocamento Lateral & ESD:**
   - Paradas defensivas em 2 tempos, projeção de primeiro passo e protocolo RSA 1:5 de sprints repetidos.
5. **Diretrizes Biomecânicas & Fisioterapia:**
   - Protocolo analgésico de Spanish Squat para tendão patelar.
   - Proteção estrita da fossa poplítea e cabeça medial do gastrocnêmio.
   - Regra das 24 Horas para monitoramento de rigidez matinal.

---

## ⚡ Recursos Técnicos da Aplicação

- **Visualização Dupla de Exercícios:** Alternância instantânea entre **Animações Reais em GIF** e **Modelos Cinemáticos Vetoriais (SVG)** com destaque de ângulos articulares (trava a 90°, positive shin angle de 45° e vetores de reação do solo).
- **Cronômetro Interativo de Descanso:** Display digital com barra de progresso, botões de Play/Pause/Reset e sinalização sonora (beeps via Web Audio API nativo).
- **Checklist de Séries & Confetti:** Marcador de séries concluídas por exercício com animação de celebração ao fechar o volume.
- **Checklist 24h do Atleta:** Modal com escala de dor (0-10), rigidez matinal, RPE da sessão e anotações com persistência em `localStorage`.
- **Modo Academia (High Contrast):** Visualização otimizada para uso no smartphone sob iluminação intensa de academia.

---

## 🛠️ Stack Tecnológica

- **Framework:** React 19 + TypeScript (strict mode)
- **Build Tool:** Vite 6
- **Estilização:** Tailwind CSS v3 com paleta Obsidian, Mamba Purple, Cyan e Emerald
- **Ícones & Efeitos:** Lucide React & Canvas Confetti
- **Áudio:** Web Audio API nativo (sem dependências externas de áudio)
- **Deploy:** Vercel Edge Network

---

## 🚀 Execução Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Visualizar build local
npm run preview
```

---

## 📬 Contato Institucional

Para suporte técnico ou requisições corporativas:  
`xiudsales@gmail.com`
