ARG VARIANT=17.1-bullseye

FROM node:${VARIANT}

ARG USERNAME=node
ENV REACT_APP_BASE_URL='https://pip-3103.herokuapp.com:443'
ENV REACT_APP_API_URL='/api/v1'
ENV HOST=0.0.0.0
ENV PORT=3000

RUN apt-get update \
    && apt-get install -y apt-utils sudo \
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL >/etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME} \
    && apt-get autoremove -y \
    && apt-get clean -y

USER ${USERNAME}
