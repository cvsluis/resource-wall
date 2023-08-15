DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
 id SERIAL PRIMARY KEY NOT NULL,
 pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
 owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 rating SMALLINT NOT NULL DEFAULT 0
);
