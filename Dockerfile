FROM elixir:latest

RUN apt-get update -qq && apt-get install -y libpq-dev && apt-get install -y build-essential inotify-tools erlang-dev erlang-parsetools apt-transport-https ca-certificates && apt-get update 
RUN mix local.hex --force && mix local.rebar --force
RUN mix archive.install hex phx_new 1.4.0 --force
WORKDIR /home/app

COPY mix.exs mix.exs
RUN mix deps.get

COPY . /home/app
RUN mix ecto.setup

CMD [ "mix", 'phx.server' ]