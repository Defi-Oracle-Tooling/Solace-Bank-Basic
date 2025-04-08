INSERT INTO users (username, password) VALUES
('client1', '<bcrypt-hash>'),
('employee1', '<bcrypt-hash>');

INSERT INTO accounts (user_id, balance) VALUES
('<uuid-app-layer>', 1000.00),
('<uuid-app-layer>', 5000.00);