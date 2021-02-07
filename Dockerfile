FROM bitwalker/alpine-elixir-phoenix:latest

# RUN apt-get update && \
#   apt-get install -y postgresql-client inotify-tools nodejs npm

EXPOSE 4000
ENV PORT=4000 MIX_ENV=prod

# Install hex package manager
RUN mix local.hex --force && mix local.rebar --force

WORKDIR /app
COPY ./package.json ./package.json
COPY ./mix.exs ./mix.exs
COPY ./mix.lock ./mix.lock
RUN mix deps.get
RUN npm install

COPY . .
RUN MIX_ENV=prod mix compile
RUN MIX_ENV=prod mix phx.digest

# RUN npm run deploy --prefix ./assets


CMD ["/app/entrypoint.sh"]
