CREATE TYPE firealarm_event_type AS ENUM (
  'firealarm',
  'disruption'
);

CREATE TABLE users (id INT8 PRIMARY KEY);
CREATE TABLE emails (
    id       INT8 PRIMARY KEY,
    user_id  INT8 NOT NULL REFERENCES users (id),
    verified BOOL NOT NULL,
    firealarm_event_type firealarm_event_type NOT NULL
);
CREATE TABLE addresses (
    id      INT8 PRIMARY KEY,
    user_id INT8 NOT NULL REFERENCES users (id)
);
