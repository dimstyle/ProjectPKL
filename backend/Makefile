include .env
export

DB_URL ?= "postgres://$(DB_USER):$(DB_PASSWORD)@$(HOST_ADDR):$(DB_PORT)/$(DB_NAME)?sslmode=disable"
MIGRATE_PATH ?= "migrations"

.PHONY: migrate-up migrate-down migrate-down-all
migrate-up:
	migrate -path $(MIGRATE_PATH) -database $(DB_URL) up

migrate-down:
	migrate -path $(MIGRATE_PATH) -database '$(DB_URL)' down 1

migrate-down-all:
	migrate -path $(MIGRATE_PATH) -database '$(DB_URL)' down -all