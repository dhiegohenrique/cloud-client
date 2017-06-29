[![Build Status](https://travis-ci.org/dhiegohenrique/suntech-front.svg?branch=master)](https://travis-ci.org/dhiegohenrique/suntech-front)

Requisitos:
1) NPM 4.0.5 ou superior (https://www.npmjs.com/get-npm);
2) http-server (https://www.npmjs.com/package/http-server);
3) Bower 1.8 ou superior (https://bower.io/);
4) O backend deve estar rodando (https://github.com/dhiegohenrique/suntech-back);

Para rodar, na pasta raíz, executar:
1) npm install;
2) bower install;
3) http-server -p 3001

A aplicação estará rodando em: http://localhost:3001

A cada commit, serão realizados testes unitários no Travis. Se passarem, o deploy será realizado em https://suntech-front.herokuapp.com