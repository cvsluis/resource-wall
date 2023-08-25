DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  -- image VARCHAR(255) DEFAULT 'https://t4.ftcdn.net/jpg/03/14/81/65/240_F_314816591_yBAWvMvnpTW05AP0q4DCs5B6y2gnL9xA.jpg',
  image_id INTEGER REFERENCES images(id) ON DELETE CASCADE NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);