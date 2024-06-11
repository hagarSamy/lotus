--  a script that creates the database lotus_dev_db and the user lotus_dev.
CREATE DATABASE IF NOT EXISTS lotus_dev_db;
CREATE USER IF NOT EXISTS 'lotus_dev'@'localhost' IDENTIFIED BY 'lotus_dev_pwd';
GRANT ALL PRIVILEGES ON lotus_dev_db.* TO 'lotus_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'lotus_dev'@'localhost';
