CREATE TABLE account (
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(64),
    email           VARCHAR UNIQUE NOT NULL,
    password        VARCHAR NOT NULL,
    date_created    TIMESTAMP
)