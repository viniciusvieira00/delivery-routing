# Projeto de Recomendação de Postagens

Este projeto é uma aplicação de recomendação de postagens desenvolvida utilizando Next.js, TypeScript e MaterialUI. A aplicação simula uma rede social onde os usuários podem se autenticar e receber recomendações de postagens com base em seus interesses. O algoritmo de Dijkstra é utilizado para calcular as postagens mais relevantes para cada usuário.

## Funcionalidades

- Autenticação de usuário com nome de usuário e senha
- Exibição do nome do usuário logado e seus interesses
- Recomendação de postagens baseadas nos interesses do usuário
- Interface moderna e intuitiva semelhante às redes sociais

## Algoritmo de Dijkstra para Recomendação de Postagens

O algoritmo de Dijkstra é utilizado para encontrar as postagens mais relevantes para o usuário logado. A relevância é determinada com base nos interesses do usuário e nas tags associadas a cada postagem. O algoritmo calcula o "caminho" mais curto entre os interesses do usuário e as postagens disponíveis, recomendando aquelas que têm maior afinidade com os interesses do usuário.

### Funcionamento do Algoritmo

1. **Construção do Grafo**: Cada postagem é representada como um nó no grafo. As conexões entre os nós (arestas) são ponderadas com base na similaridade entre as tags das postagens.
2. **Inicialização**: As distâncias de todas as postagens são inicializadas como infinitas, exceto as postagens que têm tags correspondentes aos interesses do usuário, que são inicializadas com distância zero.
3. **Execução do Algoritmo**: O algoritmo de Dijkstra é executado para encontrar o caminho mais curto (ou a menor distância) entre os interesses do usuário e as postagens.
4. **Recomendação**: As postagens que têm a menor distância calculada são recomendadas ao usuário.

## Como Executar o Projeto

### Pré-requisitos

- Node.js na versão mais atual 22.4.1 instalado
- npm ou yarn instalado

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/viniciusvieira00/post-recommendation
   cd post-recommendation
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Usuários Disponíveis para Teste

Aqui estão os usuários que você pode utilizar para testar a aplicação:

| Nome     | Nome de Usuário | Senha        | Interesses               |
|----------|-----------------|--------------|--------------------------|
| Alice    | alice           | password123  | tech, music, art         |
| Bob      | bob             | password123  | tech, sports, travel     |
| Charlie  | charlie         | password123  | music, travel, food      |
| David    | david           | password123  | sports, art, tech        |
| Eve      | eve             | password123  | food, art, tech          |

## Estrutura do Projeto

- `pages/index.tsx`: Página principal que exibe as recomendações de postagens.
- `pages/login.tsx`: Página de login para autenticação do usuário.
- `data.ts`: Simulação dos dados de usuários e postagens.
- `dijkstra.ts`: Implementação do algoritmo de Dijkstra para recomendação de postagens.

## Contribuidores do Projeto

- [Vinicius Vieira](https://github.com/viniciusvieira00), Matrícula: 190118059
- [Luciano Machado](https://github.com/Hierophylax), Matrícula: 000000000

