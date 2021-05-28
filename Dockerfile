FROM bitwalker/alpine-elixir-phoenix:latest

EXPOSE 4000
ENV PORT=4000 MIX_ENV=prod

# Install hex package manager
RUN mix local.hex --force && mix local.rebar --force

WORKDIR /app
COPY ./mix.exs ./mix.exs
COPY ./mix.lock ./mix.lock
RUN mix deps.get
WORKDIR /app/assets
COPY ./assets/package.json ./package.json
RUN npm install --only=prod

WORKDIR /app

COPY . .
RUN mix deps.get
RUN npm run deploy --prefix ./assets && source .env.prod && MIX_ENV=prod mix phx.digest && MIX_ENV=prod mix compile

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
