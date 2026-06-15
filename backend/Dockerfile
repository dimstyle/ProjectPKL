FROM golang:alpine

ARG UID
ARG GID

RUN addgroup -g ${GID} app && adduser -D -u ${UID} -h /app -G app app

USER app

WORKDIR /app/dev

ENV GOPATH=/app/go
ENV PATH="$GOPATH/bin:$PATH"

RUN go install github.com/air-verse/air@latest

CMD ["air","-d"]