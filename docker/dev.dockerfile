FROM oven/bun:latest

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/NHL-P4-INF1C/walk_smarter_node_server.git .

COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./.env /app/.env

RUN git checkout dev

RUN bun install

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]