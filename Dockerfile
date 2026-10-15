# Self-hosting alternative to Cloudflare Pages: build static files, serve with nginx.
#   docker build --build-arg VITE_SITE_URL=https://littlemalik.id -t little-malik .
#   docker run -p 8080:80 little-malik

FROM oven/bun:1.3 AS build
# Vite + the prerenderer run on Node (as locally and in CI); bun only installs
# deps and runs the generator scripts.
COPY --from=node:24-slim /usr/local/bin/node /usr/local/bin/node
WORKDIR /app
ARG VITE_SITE_URL=https://little-malik.pages.dev
ENV VITE_SITE_URL=$VITE_SITE_URL
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM nginx:1.27-alpine AS runtime
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/_headers /usr/share/nginx/html/_redirects
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
