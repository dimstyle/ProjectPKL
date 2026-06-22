#!/usr/bin/env python3
import argparse
from pathlib import Path
import subprocess
import sys
from shutil import which

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPT_DIR.parent


def create_file(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")
    print(f"Created {path}")


def generate_handler(module: str, name: str) -> None:
    handler_dir = ROOT_DIR / "internal" / module / "handlers"
    service_dir = ROOT_DIR / "internal" / module / "services"

    handler_dir.mkdir(parents=True, exist_ok=True)
    service_dir.mkdir(parents=True, exist_ok=True)

    handler_file = handler_dir / f"{name}Handler.go"
    service_file = service_dir / f"{name}Service.go"

    if handler_file.exists():
        print(f"Error: Handler file already exists: {handler_file}", file=sys.stderr)
        sys.exit(1)
    if service_file.exists():
        print(f"Error: Service file already exists: {service_file}", file=sys.stderr)
        sys.exit(1)

    handler_content = f'''package handlers

import (
\t"backend/internal/{module}/services"
\t"backend/internal/db"
)

func New{name}Handler(q *db.Queries) *{name}Handler {{
\treturn &{name}Handler{{
\t\tservice: services.New{name}Service(q),
\t}}
}}

type {name}Handler struct {{
\tservice *services.{name}Service
}}
'''

    service_content = f'''package services

import (
\t"backend/internal/db"
)

func New{name}Service(q *db.Queries) *{name}Service {{
\treturn &{name}Service{{
\t\trepo: q,
\t}}
}}

type {name}Service struct {{
\trepo *db.Queries
}}
'''

    create_file(handler_file, handler_content)
    create_file(service_file, service_content)

    if which("gofmt"):
        subprocess.run(["gofmt", "-w", str(handler_file), str(service_file)], check=False)


def generate_module(module: str) -> None:
    base_dir = ROOT_DIR / "internal" / module
    subdirs = ["handlers", "services", "dto", "routes"]

    for subdir in subdirs:
        directory = base_dir / subdir
        directory.mkdir(parents=True, exist_ok=True)
        placeholder = directory / "placeholder.go"
        if not placeholder.exists():
            create_file(
                placeholder,
                f"package {subdir}\n\n// TODO: add {module} {subdir} implementations.\n"
            )
        else:
            print(f"Skipped existing file {placeholder}")

    print(f"Created module scaffold for {module}.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Go handler/service or create a module scaffold under internal/<module>.")
    parser.add_argument(
        "-m",
        "--module",
        action="store_true",
        help="Create module scaffold instead of a handler/service.",
    )
    parser.add_argument("module", help="Module name")
    parser.add_argument("name", nargs="?", help="Handler name when generating handler/service")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.module:
        if args.name is not None:
            print("Error: Do not pass a handler name when using --module.", file=sys.stderr)
            sys.exit(1)
        generate_module(args.module)
    else:
        if args.name is None:
            print("Error: Handler name is required when not using --module.", file=sys.stderr)
            sys.exit(1)
        generate_handler(args.module, args.name)


if __name__ == "__main__":
    main()
