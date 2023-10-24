## Technologies

<ul>
  <li><a href="https://electron.atom.io/">Electron</a></li>
  <li><a href="https://facebook.github.io/react/">React</a></li>
  <li><a href="https://github.com/reactjs/react-router">React Router</a></li>
  <li><a href="https://webpack.js.org/">Webpack</a></li>
  <li><a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a></li>
</ul>

## Init project

```bash
$ git clone --depth=1 https://github.com/electron-react-boilerplate/electron-react-boilerplate your-project-name
$ cd your-project-name
```

## Setup MQTT with docker

1. Install <a href="https://docs.docker.com/desktop/install/windows-install/">Docker</a>
2. Install image for MQTT

```bash
$ docker pull emqx/emqx
```

3. Run container for MQTT

```bash
$ docker run -d --name emqx -e EMQX_LISTENER__TCP__EXTERNAL=1883 -p 18083:18083 -p 1883:1883 -p 8083:8083 -p 8084:8084 emqx/emqx:latest
```

Port 18083 for web management MQTT
Port 1883 for MQTT
Port 8083 for WS
Port 8084 for WSS

## Installation

Node version greater than 14.x

```bash
$ yarn
or
$ npm install
```

## Enviroment

- Add file env.ts at root folder
- Add environment variables in this file like the env.example.ts file

## Running the app

```bash
$ yarn start
or
$ npm run start
```

## Web view

```bash
$ http://localhost:1212
```

## Version management

- Go to file release/app/packkage.json
- Edit "version" (Example: "version": "0.0.1")

## Build

### For dev

```bash
$ yarn package-dev
or
$ npm run package-dev
```

### For live

```bash
$ yarn package-live
or
$ npm run package-live
```
