# Scripts

## generate_handler_service.sh

Generate Go handler/service code or create a module scaffold under `internal/<module>`.

### Usage

Generate a handler and service:

```bash
./scripts/generate_handler_service.sh <module> <Name>
```

Create a new module scaffold:

```bash
./scripts/generate_handler_service.sh --module <module>
```

## generate_handler_service.py

Same as `generate_handler_service.sh`, but for Python.

### Usage

Generate a handler and service:

```bash
python3 scripts/generate_handler_service.py <module> <Name>
```

Create a new module scaffold:

```bash
python3 scripts/generate_handler_service.py --module <module>
```

### Examples

```bash
./scripts/generate_handler_service.sh --module user
./scripts/generate_handler_service.sh user Userprofile
python3 scripts/generate_handler_service.py --module user
python3 scripts/generate_handler_service.py user Userprofile
```

This will create either:

- `internal/<module>/handlers/<Name>Handler.go`
- `internal/<module>/services/<Name>Service.go`

or a module scaffold with:

- `internal/<module>/handlers/placeholder.go`
- `internal/<module>/services/placeholder.go`
- `internal/<module>/dto/placeholder.go`
- `internal/<module>/routes/placeholder.go`

The generated files follow the existing project pattern used in `internal/auth` and `internal/user`.

## generate_module.sh

Create a new internal module scaffold with `handlers`, `services`, `dto`, and `routes` directories.

### Usage

```bash
./scripts/generate_module.sh <module>
```

### Example

```bash
./scripts/generate_module.sh user
```

This creates:

- `internal/user/handlers/placeholder.go`
- `internal/user/services/placeholder.go`
- `internal/user/dto/placeholder.go`
- `internal/user/routes/placeholder.go`

## generate_module.py

Same as `generate_module.sh`, but in Python.

### Usage

```bash
python3 scripts/generate_module.py <module>
```

### Example

```bash
python3 scripts/generate_module.py user
```
