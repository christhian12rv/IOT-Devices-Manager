<h1 align="center">IOT Devices Manager</h1>

<!-- Índice -->
<details>
  <summary>Índice</summary>
  <ol>
        <li><a href="#feito-com">Feito com</a></li>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#rodando-o-projeto">Rodando o projeto</a></li>
      </ul>
    </li>
    <li><a href="#ilustrações">Ilustrações</a></li>
    <li><a href="#explicação-do-projeto">Explicação do projeto</a></li>
  </ol>
</details>

### Feito com


-   [Typescript](https://www.typescriptlang.org)
-   [NodeJS v16.18.0](https://nodejs.org/en/download/releases/)
-   [Express](https://expressjs.com/)
-   [Prisma](https://www.prisma.io)
-   [MongoDB](https://www.mongodb.com)
-   [Docker](https://www.docker.com)

<!-- Começando -->

## Começando

### Pré requisitos

#### Docker

Se preferir, pode-se rodar o projeto via Docker e Docker-Compose. Para isso, é necessário ter o [Docker](https://www.docker.com) e o [Docker-Compose](https://docs.docker.com/compose/install/) instalado em sua máquina. Basta acessar os sites clicando no link anterior e instalá-los de acordo com seu sistema operacional.

#### Node

Outra maneira é instalar todas as ferramentas necessárias para rodar o projeto. A primeira a ser instalada é o [NodeJS](https://nodejs.org/en/). <ins>**OBS: Lembre-se de instalar a versão v16.18.0, pois é mais garantida de o projeto funcionar**</ins>.

-   #### Instalação do Node no Windows

    Basta acessar o [site oficial do Node.js](https://nodejs.org/) e baixar o instalador.
    Além disso, certifique-se de ter o `git` disponível em seu PATH, `npm` pode precisar dele (você pode encontrar o git [aqui](https://git-scm.com/)).

-   ##### Instalação do Node no Ubuntu

    Você pode instalar o nodejs e o npm facilmente com o apt install, basta executar os seguintes comandos.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ##### Outros sistemas operacionais
    Você pode encontrar mais informações sobre a instalação no [site oficial do Node.js](https://nodejs.org/) e no [site oficial do NPM](https://npmjs.org/).

    Se a instalação foi bem-sucedida, você poderá executar o seguinte comando.

        $ node --version
        v16.3.0
    
        $ npm --version
        7.24.0

    Se você precisar atualizar o `npm`, você pode fazê-lo usando o `npm`! Legal, certo? Após executar o seguinte comando,    basta abrir novamente a linha de comando e ser feliz.
    
        $ npm install npm -g



### Instalação

1. Clone o repositório
    ```sh
    $ git clone https://github.com/christhian12rv/IOT-Devices-Manager.git
    ```
    
#### Docker

2. Altere DATABASE_URL do arquivo .env.dev.  <ins>**OBS: O banco de dados MongoDB deve ser uma replica set. Recomendo utilizar o cloud fornecido pelo [MongoDB Atlas](https://www.mongodb.com/atlas/database)**</ins>. 
    ```sh
    DATABASE_URL=mongodb+srv://{USUARIO}:{SENHA}@{HOST}/{BANCO}?retryWrites=true&w=majority
    ```

3. Faça o build do projeto
    ```sh
    $ docker-compose build
    ```
    
#### Sem Docker

2. Instale os pacotes npm
    ```sh
    $ npm install
    ```

### Rodando o projeto

#### Docker

1. Na primeira vez que for rodar o projeto, será necessário fazer o push das configurações do prisma para o banco de dados.
    ```sh
    $ docker exec iot-devices-manager-server npx prisma db push --schema=./src/prisma/schema.prisma
    ```
1. Rode o projeto. Se preferir, pode-se adicionar o comando "-d" para rodar em background.
    ```sh
    $ docker-compose up
    ```
3. Para finalizar os containeres, rode o seguinte comando.
    ```sh
    $ docker-compose down
    ```

#### Sem Docker

1. Crie um arquivo .env na raíz do projeto. Altere o arquivo .env. <ins>**OBS: O banco de dados MongoDB deve ser uma replica set. Recomendo utilizar o cloud fornecido pelo [MongoDB Atlas](https://www.mongodb.com/atlas/database)**</ins>. 
    ```sh
    PORT=PORTA_DO_SEU_SERVIDOR
    DATABASE_URL=mongodb+srv://{USUARIO}:{SENHA}@{HOST}/{BANCO}?retryWrites=true&w=majority
    MQTT_HOST=HOST_MQTT-EXEMPLO:broker.emqx.io
    MQTT_PORT=PORTA_MQTT-EXEMPLO:1883
    MQTT_USERNAME=USERNAME_MQTT-EXEMPLO:emqx
    MQTT_PASSWORD=SENHA_MQTT-EXEMPLO:public
    ```

2. Na primeira vez que for rodar o projeto, rode o seguinte comando
    ```sh
    $ npx prisma migrate dev --schema=./src/prisma/schema.prisma
    ```
    
3. Execute o projeto
    ```sh
    $ npm start
    ```
    

## Explicação do projeto
O projeto consiste em uma api de gerenciamento de dispositivos IOT.

Cocê pode ver os dispositivos IOT registrados, criar, atualizar e deletá-los. Você pode fazer as requisições via HTTP ou MQTT.