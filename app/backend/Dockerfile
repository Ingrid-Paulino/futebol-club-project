# imagem
FROM node:16-alpine
# caminho do diretorio onde eu quero q minha aplicação esteja rodando
WORKDIR /app
# copia toda a pasta do diretorio atual e manda para o diretorio(conteiner) passado no workdir
COPY . .
# porta
EXPOSE 3001
# inicia 
CMD [ "npm", "start" ]

#  ...
