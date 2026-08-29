---
name: sql
description: Use when writing, reviewing, debugging, or optimizing SQL queries for MySQL or PostgreSQL, or when the user mentions SQL, MySQL, PostgreSQL, queries, database schemas, or DDL/DML.
---

# SQL, MySQL y PostgreSQL

Guía para escribir, revisar y optimizar consultas SQL en MySQL y PostgreSQL.

## Principios generales

- Usa `SELECT` con columnas explícitas, nunca `SELECT *` salvo inspección rápida.
- Prefiere `JOIN` explícitos sobre subconsultas correlacionadas cuando sea posible.
- Indenta las cláusulas y usa nombres de alias descriptivos (`u`, `o`, `p`).
- Escapa los identificadores según el dialecto: backticks en MySQL, dobles comillas en PostgreSQL.
- Siempre incluye `WHERE` en `DELETE`/`UPDATE` a menos que el borrado total sea intencional.

## Diferencias clave MySQL vs PostgreSQL

| Aspecto | MySQL | PostgreSQL |
| --- | --- | --- |
| Identificadores | `` `nombre` `` | `"nombre"` |
| Límite | `LIMIT n` | `LIMIT n` / `FETCH FIRST n ROWS` |
| Cadena/escapado | `'texto'`, `\\` | `'texto'`, `E'...'` |
| Tipos | `INT`, `VARCHAR(n)`, `DATETIME`, `TINYINT` | `INTEGER`, `VARCHAR(n)`, `TIMESTAMP`, `BOOLEAN` |
| Autoincremento | `AUTO_INCREMENT` | `SERIAL` / `GENERATED ALWAYS AS IDENTITY` |
| Upsert | `INSERT ... ON DUPLICATE KEY UPDATE` | `INSERT ... ON CONFLICT (col) DO UPDATE SET` |
| Búsqueda de texto | `MATCH ... AGAINST` (FULLTEXT) | `to_tsvector` / `to_tsquery` |
| JSON | `JSON`, funciones `->` / `->>` | `JSONB` con índice GIN |
| Pivote | agregado condicional con `CASE` | `FILTER (WHERE ...)` |

## Consultas comunes

### Inserción con conflicto (upsert)

MySQL:

```sql
INSERT INTO productos (sku, nombre, precio)
VALUES ('SKU-1', 'Camiseta', 19.99)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  precio = VALUES(precio);
```

PostgreSQL:

```sql
INSERT INTO productos (sku, nombre, precio)
VALUES ('SKU-1', 'Camiseta', 19.99)
ON CONFLICT (sku) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  precio = EXCLUDED.precio;
```

### Paginación eficiente

Keyset (recomendado para tablas grandes):

```sql
SELECT id, nombre
FROM productos
WHERE (precio, id) > ($1, $2)   -- PostgreSQL
ORDER BY precio, id
LIMIT 20;
```

Offset (solo para datos pequeños):

```sql
SELECT id, nombre
FROM productos
ORDER BY id
LIMIT 20 OFFSET 40;
```

### Ventanas (ranking por grupo)

```sql
SELECT
  categoria,
  nombre,
  precio,
  ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS pos
FROM productos;
```

## Optimización

- Analiza el plan: en MySQL `EXPLAIN SELECT ...`, en PostgreSQL `EXPLAIN ANALYZE SELECT ...`.
- Evita `%...%` al inicio de `LIKE` (impide usar índice); considera índices FULLTEXT/GIN.
- Aplica `WHERE` antes de unir; filtra en la tabla base, no sobre `LEFT JOIN` nulos.
- Crea índices compuestos alineados con el `ORDER BY` / filtro: `(col_a, col_b)`.
- Evita funciones sobre columnas en `WHERE` (ej. `YEAR(fecha) = 2026`), usa rangos `fecha >= '2026-01-01' AND fecha < '2027-01-01'`.
- Usa `EXPLAIN` para confirmar si hay `Seq Scan`/`ALL` que convenga convertir a índice.

## Seguridad

- Usa siempre consultas parametrizadas / prepared statements; nunca concatenes input del usuario.
- Revisa permisos: en MySQL `GRANT`, en PostgreSQL `GRANT`/roles con privilegio mínimo.
- No incluyas credenciales ni datos sensibles en consultas o logs.

## Convenciones de esquema

- Nombres de tablas en plural y en snake_case (`productos`, `order_items`).
- Clave primaria `id` tipo entero autogenerado o UUID.
- Claves foráneas `tabla_id` con `ON DELETE RESTRICT` o `CASCADE` según negocio.
- Columnas de tiempo `created_at` / `updated_at` con `DEFAULT NOW()`/`CURRENT_TIMESTAMP`.
- Índice en toda columna usada en `JOIN` o `WHERE` frecuente.
