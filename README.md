# ElCloud

## Dev build

  mix deps.get && mix ecto.setup && mix start`


## Production build

  You need to create DB and .env files before executing this command

  npm run deploy --prefix ./assets && source .env.prod && MIX_ENV=prod mix phx.digest && MIX_ENV=prod mix start


## Docker build

  docker-compose up --build


Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
