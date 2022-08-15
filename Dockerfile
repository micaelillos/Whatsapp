ARG WORK_DIR=/app
FROM micael11/node-nginx:latest
WORKDIR ${WORK_DIR}

ENV CHROME_BIN=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

COPY . . 
# RUN npm run build --prod
# Copy client static files (must be built before)
COPY ${WORK_DIR}/client/dist /usr/share/nginx/html
# Backend
RUN cd backend && yarn && yarn build
# Copy nginx conf 
COPY  ${WORK_DIR}/nginx/nginx.conf /etc/nginx/conf.d/default.conf 
# Expose ports
EXPOSE 80
EXPOSE 3000
# Run node server and nginx dameon
CMD ["sh", "-c", "node ./backend/dist/main.js  & nginx -g 'daemon off;' "]