#!/usr/bin/env python3
import argparse
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPT_DIR.parent


def create_file(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")
    print(f"Created {path}")


def generate_module(module: str) -> None:
    base_dir = ROOT_DIR / "internal" / module
    subdirs = ["handlers", "services", "dto", "routes"]

    for subdir in subdirs:
        directory = base_dir / subdir
        directory.mkdir(parents=True, exist_ok=True)

    print(f"Created module scaffold for {module}.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create a new internal module scaffold under internal/<module>.")
    parser.add_argument("module", help="Module name")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    generate_module(args.module)


if __name__ == "__main__":
    main()
