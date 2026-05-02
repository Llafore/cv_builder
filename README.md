# CV Builder

Este é um utilitário simples e eficiente para gerar currículos profissionais em formatos HTML e PDF a partir de dados estruturados em um arquivo JSON.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior recomendada).
- npm (geralmente instalado junto com o Node.js).

## Instalação

1. Clone ou baixe este repositório.
2. No terminal, acesse a pasta raiz do projeto.
3. Instale as dependências necessárias:
   ```bash
   npm install
   ```

## Como Usar

1. **Configure seus dados**: Abra o arquivo `/data/cv.json` e preencha com suas informações pessoais, experiências e habilidades.
2. **Gere o currículo**: Execute o comando abaixo no seu terminal:
   ```bash
   npm run dev
   ```
3. **Acesse o resultado**: O script irá gerar os arquivos `cv.html` e `cv.pdf` dentro da pasta `/output/`.

## Estrutura de Arquivos

- `src/`: Contém a lógica de processamento e gerenciamento de arquivos.
- `data/`: Local onde o conteúdo do currículo (JSON) deve ser editado.
- `templates/`: Arquivos de template (Handlebars) para definir o visual do currículo.
- `output/`: Pasta onde os currículos gerados serão salvos.