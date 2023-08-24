DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  pronouns VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  about_me VARCHAR(255) NOT NULL
);

-- Note that pronouns are not a requirement for users because
-- people in the LGBTQ+ community do not always feel safe to
-- share pronouns in online and/or physical spaces.
-- To learn more about pronouns, visit: https://lgbt.foundation/pronouns
