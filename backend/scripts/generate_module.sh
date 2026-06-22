#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $0 <module>

Create a new internal module scaffold under internal/<module>.

This creates directories:
  internal/<module>/handlers
  internal/<module>/services
  internal/<module>/dto
  internal/<module>/routes

Each directory gets a placeholder Go file.
EOF
}

if [ "$#" -ne 1 ]; then
  usage
  exit 1
fi

module="$1"
base_dir="internal/${module}"

for sub in handlers services dto routes; do
  dir="${base_dir}/${sub}"
  mkdir -p "${dir}"
  placeholder="${dir}/placeholder.go"
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
