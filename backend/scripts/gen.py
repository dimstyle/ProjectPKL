#!/usr/bin/env python3

import argparse
import re
import subprocess
import sys
from pathlib import Path
from shutil import which

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPT_DIR.parent


def get_go_module() -> str:
    go_mod = ROOT_DIR / "go.mod"

    if not go_mod.exists():
        raise RuntimeError("go.mod not found")

    for line in go_mod.read_text().splitlines():
        line = line.strip()

        if line.startswith("module "):
            return line.split()[1]

    raise RuntimeError("module declaration not found in go.mod")


GO_MODULE = get_go_module()

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
        print(f"Error: {handler_file} already exists", file=sys.stderr)
        sys.exit(1)

    if service_file.exists():
        print(f"Error: {service_file} already exists", file=sys.stderr)
        sys.exit(1)

    handler_content = f"""package handlers

import (
\t"{GO_MODULE}/internal/{module}/services"
\t"{GO_MODULE}/internal/db"
)

func New{name}Handler(q *db.Queries) *{name}Handler {{
\treturn &{name}Handler{{
\t\tservice: services.New{name}Service(q),
\t}}
}}

type {name}Handler struct {{
\tservice *services.{name}Service
}}
"""

    service_content = f"""package services

import (
\t"{GO_MODULE}/internal/db"
)

func New{name}Service(q *db.Queries) *{name}Service {{
\treturn &{name}Service{{
\t\trepo: q,
\t}}
}}

type {name}Service struct {{
\trepo *db.Queries
}}
"""

    create_file(handler_file, handler_content)
    create_file(service_file, service_content)

    if which("gofmt"):
        subprocess.run(
            ["gofmt", "-w", str(handler_file), str(service_file)],
            check=False,
        )


def generate_module(module: str) -> None:
    base_dir = ROOT_DIR / "internal" / module

    for subdir in [
        "handlers",
        "services",
        "dto",
        "routes",
    ]:
        (base_dir / subdir).mkdir(parents=True, exist_ok=True)

    print(f"Created module scaffold: {module}")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Generate Go module or handler/service"
    )

    parser.add_argument(
        "-m",
        "--make-module",
        action="store_true",
        help="Create module scaffold",
    )

    parser.add_argument(
        "module",
        help="Module name",
    )

    parser.add_argument(
        "name",
        nargs="?",
        help="Handler/Service name",
    )

    return parser.parse_args()


def main():
    args = parse_args()

    if args.make_module:
        if args.name:
            print(
                "Error: do not provide handler name when creating module",
                file=sys.stderr,
            )
            sys.exit(1)

        generate_module(args.module)
        return

    if not args.name:
        print(
            "Error: handler name is required",
            file=sys.stderr,
        )
        sys.exit(1)

    generate_handler(args.module, args.name)


if __name__ == "__main__":
    main()