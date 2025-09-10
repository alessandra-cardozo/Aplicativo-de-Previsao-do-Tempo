🌦 Weather App

Aplicativo simples de previsão do tempo desenvolvido em HTML, CSS e JavaScript.
Permite buscar a previsão do clima por nome da cidade ou pela localização atual do usuário, exibindo ícone, temperatura, descrição e previsão por hora.

📂 Estrutura do projeto
APLICACAO/
│── index.html        # Estrutura principal da aplicação
│── style.css         # Estilos (responsivo, animações e layout)
│── script.js         # Lógica de integração com API de clima
│── README.md         # Documentação do projeto
│
└── imagem/
    └── icons/
        ├── clear.svg
        ├── clouds.svg
        ├── mist.svg
        ├── moderate_heavy_rain.svg
        ├── no-result.svg
        ├── rain.svg
        ├── snow.svg
        ├── thunder.svg
        └── thunder_rain.svg

🚀 Funcionalidades

🔍 Busca por cidade: o usuário digita o nome da cidade para ver o clima.

📍 Localização atual: botão para buscar a previsão com base na geolocalização.

☁️ Exibição de clima atual: ícone, temperatura e descrição.

⏰ Previsão por hora: lista horizontal com detalhes do clima ao longo do dia.

🚫 Mensagem de erro: caso a cidade não seja encontrada, mostra o ícone no-result.svg.

🛠 Tecnologias usadas

HTML5

CSS3 (responsivo e estilização moderna)

JavaScript (consumo da API de clima)

Google Fonts & Material Symbols (ícones e tipografia)

📸 Prévia da interface

Tela inicial com busca

Clima atual exibido com ícone e temperatura

Previsão horária rolável

Mensagem de erro amigável caso a cidade não seja encontrada

🔧 Como rodar o projeto

Clone este repositório ou baixe os arquivos.

git clone https://github.com/usuario/weather-app.git

Abra o arquivo index.html diretamente no navegador.

(Opcional) Para rodar via servidor local, use a extensão Live Server no VS Code.

⚠️ Observações

O arquivo default.svg não existe.

Para ícones de erro está sendo usado no-result.svg.

Para o clima padrão inicial está sendo usado clouds.svg.

Se preferir, você pode criar um default.svg e adicioná-lo à pasta imagem/icons/.


