FROM bitwalker/alpine-elixir-phoenix:latest AS phx-builder

ENV MIX_ENV=prod
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
RUN MIX_ENV=prod mix compile
RUN MIX_ENV=prod mix phx.digest

RUN npm run deploy --prefix ./assets

FROM bitwalker/alpine-elixir:latest
EXPOSE 4000

COPY --from=phx-builder ./_build /app/_build
COPY --from=phx-builder ./priv /app/priv
COPY --from=phx-builder ./config /app/config
COPY --from=phx-builder ./lib /app/lib
COPY --from=phx-builder ./deps /app/deps
COPY --from=phx-builder ./mix /app/.mix
COPY --from=phx-builder ./mix.* /app/

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
