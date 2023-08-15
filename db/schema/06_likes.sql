DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
 id SERIAL PRIMARY KEY NOT NULL,
 pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
 owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
