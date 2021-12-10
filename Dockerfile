ARG VARIANT=17.1-bullseye

FROM node:${VARIANT}

ARG USERNAME=node
ENV REACT_APP_BASE_URL='https://pip-3103.herokuapp.com:443'
ENV REACT_APP_API_URL='/api/v1'
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN chown -R ${USERNAME} /usr/src/app \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]
