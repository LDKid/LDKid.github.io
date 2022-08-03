---
published: false
date: 2022-06-22
name: Live Hanging
type: game
image_path: /assets/projects/live-hanging/
slideshow: [ cover.png ]
links: []
tags: [ Godot, Twitch, Customization ]
engine: Godot
slogan: Jogue ou deixe o seu chat jogar o jogo da forca personalizado!
---
Live Hanging é um jogo completamente costumizavel da forca, que dá para jogar sózinho ou fazer live stream no Twitch e deixar o chat jogar.

O menu principal tem um botão para Offline e Streamer, a segunda opção pede o nome de Twitch. Após escrever, um código é gerado e mostrado. Esse código pode ser usado apenas pelo Streamer, caso outra pessoa use é simplesmente ignorada. Esse código autentifica o Streamer como a pessoa com o jogo aberto.


Quer seja Offline ou Steaming, o jogador tem de escolhe um Tópico. Estes tópicos são relacionados a jogos, alguns exemplos são Arcade, Terror, e RPG. Se o jogador quiser, pode escolher "Aleatório" e a palavra é escolhida de qualquer tópico. Outra opção é escrever uma lista customizada de até 10 palavras.

Depois da preparação, o jogo pode finalmente começar. Dependendo de se é Offline ou Streaming, funciona de formas diferentes:
- Jogadores offline podem usar o teclado ou os botões no ecrâ para jogar;
- Streamers podem agora deixar o jogo aberto e o chat joga escrevendo comandos na caixa de chat da Twitch.

O jogo mantém nota de vitórias e derrotas, e tem também uma leaderboard para o chat.

#### Como funciona

O jogo usa o API do Twitch.   
Quando começa, verifica se alguém no chat usou o comando !lhplay para se registar. Se existe pelo menos um jogador na lista de jogadores ativos, será escolhido aleatóriamente um deles, evitando repetições (a não ser que seja apenas uma pessoa). Apenas o jogadores escolhido pode tentar adivinhar. Existe também um sistema de banir, se a pessoa escolhida não jogar antes do tempo acabar o turno deles acaba. Cada vez que isso acontece o tempo para eles ficará mais breve, e caso aconteça 3 vezes são removidos da lista de jogadores ativos e adicionados aos jogadores banidos.

#### Customização

Tudo no jogo pode ser alterado, desde a personagem, à lista de palavras, a forca e até o fundo.   
Existe um botão no menu de customização que leva a uma página web onde jogadores podem [pedir](./en/404) que novas imagens sejam feitas e adicionadas ao jogo para eles usarem.

#### Suporte de Mobile

O jogo funciona em telemóveis, mas não foi otimizado visualmente para isso. Para a melhor experiência, jogar no computador é recomendado.
    
#### Lista de Comandos do Chat:

- **!livehanging** → Mostra informação do jogo.
- **!lhhelp** → Mostra e explica a lista de comandos.
- **!lhauth** → APENAS STREAMER. Quando escrito, o streamer confirma que está a jogar e permite ao jogo interagir com o chat.
- **!lhstart** → APENAS STREAMER. Começa o jogo. Em vez do comando, existe também um botão no jogo que faz o mesmo.
- **!lhplay** → Regista a pessoa na lista de jogadores ativos para que possa ser escolhido.
- **!lhpass** → Passa o turno.
- **!lhl** ou **!lhletter** → Adivinha a letra l. Com "!lhl a" advinha a letra "a".
- **!lhw** ou **!lhword** → Adivinha a palavra w. Com "!lhw hangman" tenta adivnhar a palavra "hangman".
- **!lhleave** → Quando um jogador já não quer jogar mais pode escrever este comando para sair do jogo.

#### Reflexão Pessoal

A ideia do projeto era fazer um jogo para Streamers de Twitch. O jogo em si foi facil de fazer, as partes interessantes foram a integração com o API do Twitch, a customização e o lançamento.