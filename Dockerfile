# Build Frontend

FROM node:current-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend/ /frontend/

RUN npm install

RUN npm run build


# Build Backend

FROM golang:alpine AS backend-builder

WORKDIR /backend

COPY backend/ /backend/

RUN go mod download
RUN go build -o main ./cmd/api/main.go

# Final Image
FROM alpine:latest

WORKDIR /app

COPY --from=backend-builder /backend/main /app
COPY --from=backend-builder /backend/.env /app/.env
COPY --from=frontend-builder /frontend/dist /app/frontend


EXPOSE 8080

CMD ["./main"]


