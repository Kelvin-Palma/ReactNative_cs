#!/usr/bin/env bash
set -euo pipefail

# Ejecutar desde cualquier directorio, creando estructura en campusquest-backend/
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$BASE_DIR/src/config"
mkdir -p "$BASE_DIR/src/models"
mkdir -p "$BASE_DIR/src/routes"
mkdir -p "$BASE_DIR/src/controllers"
mkdir -p "$BASE_DIR/src/middleware"

# Archivos base
: > "$BASE_DIR/src/config/db.js"

: > "$BASE_DIR/src/models/Location.js"
: > "$BASE_DIR/src/models/Question.js"
: > "$BASE_DIR/src/models/Team.js"
: > "$BASE_DIR/src/models/Response.js"
: > "$BASE_DIR/src/models/User.js"

: > "$BASE_DIR/src/routes/auth.routes.js"
: > "$BASE_DIR/src/routes/location.routes.js"
: > "$BASE_DIR/src/routes/question.routes.js"
: > "$BASE_DIR/src/routes/team.routes.js"
: > "$BASE_DIR/src/routes/response.routes.js"

: > "$BASE_DIR/src/controllers/auth.controller.js"
: > "$BASE_DIR/src/controllers/location.controller.js"
: > "$BASE_DIR/src/controllers/question.controller.js"
: > "$BASE_DIR/src/controllers/team.controller.js"
: > "$BASE_DIR/src/controllers/response.controller.js"

: > "$BASE_DIR/src/middleware/auth.middleware.js"
: > "$BASE_DIR/src/server.js"
: > "$BASE_DIR/.env"

# Asegurar que .env no se suba a git
if [ -f "$BASE_DIR/.gitignore" ]; then
  grep -qxF ".env" "$BASE_DIR/.gitignore" || echo ".env" >> "$BASE_DIR/.gitignore"
else
  printf ".env\n" > "$BASE_DIR/.gitignore"
fi

echo "Estructura creada en: $BASE_DIR"
