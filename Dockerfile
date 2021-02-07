FROM elixir:latest

RUN apt-get update && \
  apt-get install -y postgresql-client inotify-tools nodejs npm

# Install hex package manager
RUN mix local.hex --force && mix local.rebar --force

WORKDIR /app
COPY ./package.json ./package.json
COPY ./mix.exs ./mix.exs
COPY ./mix.lock ./mix.lock
RUN mix deps.get
RUN npm install

COPY . .

RUN mix do compile
RUN mix ecto.create

CMD ["/app/entrypoint.sh"]
