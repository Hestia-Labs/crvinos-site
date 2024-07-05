
CREATE TABLE mailing_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    subscribed_on DATE DEFAULT (DATE('now')),
    status TEXT DEFAULT 'active'
);

INSERT INTO mailing_list (email, name)
VALUES ('example@example.com', 'John Doe');


UPDATE mailing_list
SET status = 'unsubscribed'
WHERE email = 'example@example.com';


CREATE INDEX idx_email ON mailing_list(email);

