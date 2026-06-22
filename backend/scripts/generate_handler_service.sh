#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage:
  $0 [--module|-m] <module>
  $0 <module> <Name>

Generate a Go handler/service or create a module scaffold under internal/<module>.

Options:
  -m, --module   Create module scaffold with handlers, services, dto, and routes.

Examples:
  $0 --module user
  $0 user Userprofile
  $0 auth Registration
EOF
}

create_module() {
  local module="$1"
  local base_dir="internal/${module}"

  for sub in handlers services dto routes; do
    local dir="${base_dir}/${sub}"
    mkdir -p "${dir}"
    local placeholder="${dir}/placeholder.go"
    if [ ! -e "${placeholder}" ]; then
      cat > "${placeholder}" <<EOF
package ${sub}

// TODO: add ${module} ${sub} implementations.
EOF
      echo "Created ${placeholder}"
    else
      echo "Skipped existing file ${placeholder}"
    fi
  done

  echo "Created module scaffold for ${module}."
}

generate_handler() {
  local module="$1"
  local name="$2"
  local handler_dir="internal/${module}/handlers"
  local service_dir="internal/${module}/services"
  local handler_file="${handler_dir}/${name}Handler.go"
  local service_file="${service_dir}/${name}Service.go"

  mkdir -p "${handler_dir}" "${service_dir}"

  if [ -e "${handler_file}" ]; then
    echo "Handler file already exists: ${handler_file}" >&2
    exit 1
  fi

  if [ -e "${service_file}" ]; then
    echo "Service file already exists: ${service_file}" >&2
    exit 1
  fi

  cat > "${handler_file}" <<EOF
package handlers

import (
	"backend/internal/${module}/services"
	"backend/internal/db"
)

func New${name}Handler(q *db.Queries) *${name}Handler {
	return &${name}Handler{
		service: services.New${name}Service(q),
	}
}

type ${name}Handler struct {
	service *services.${name}Service
}
EOF

  cat > "${service_file}" <<EOF
package services

import (
	"backend/internal/db"
)

func New${name}Service(q *db.Queries) *${name}Service {
	return &${name}Service{
		repo: q,
	}
}

type ${name}Service struct {
	repo *db.Queries
}
EOF

  if command -v gofmt >/dev/null 2>&1; then
    gofmt -w "${handler_file}" "${service_file}"
  fi

  echo "Created ${handler_file} and ${service_file}."
}

create_module_flag=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--module)
      create_module_flag=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      break
      ;;
  esac
done

if [ "$create_module_flag" = true ]; then
  if [ "$#" -ne 1 ]; then
    usage
    exit 1
  fi
  create_module "$1"
  exit 0
fi

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

generate_handler "$1" "$2"
