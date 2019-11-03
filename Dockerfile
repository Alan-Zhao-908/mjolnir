from node:8.16.0

add ./package.json /tmp/

run cd /tmp/ && npm install 

run npm install -g pm2

Add ./ /code/

run cp -r /tmp/node_modules /code/

expose 3000

workdir /code

CMD ["npm", "start"]

# entrypoint ["node", "/server/server.js"]

