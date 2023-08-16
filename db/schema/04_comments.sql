DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
 id SERIAL PRIMARY KEY NOT NULL,
 pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
 owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 description VARCHAR(255) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
