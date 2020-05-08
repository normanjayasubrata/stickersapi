CREATE TABLE logo (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(64) NOT NULL,
    description VARCHAR,
    rating      INTEGER,
    url         VARCHAR NOT NULL
);