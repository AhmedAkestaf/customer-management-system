-- Ensure the 'customer' table exists
CREATE TABLE IF NOT EXISTS customer
(
    id              UUID PRIMARY KEY,
    name            VARCHAR(255)        NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    address         VARCHAR(255)        NOT NULL,
    date_of_birth   DATE                NOT NULL,
    registered_date DATE                NOT NULL
    );

-- Insert customers
INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174000',
       'Ahmed Bennani',
       'ahmed.bennani@gmail.com',
       'Avenue Mohammed V, Casablanca',
       '1985-03-15',
       '2024-01-10'
    WHERE NOT EXISTS (SELECT 1
                  FROM customer
                  WHERE id = '123e4567-e89b-12d3-a456-426614174000');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174001',
       'Fatima Alaoui',
       'fatima.alaoui@gmail.com',
       'Rue des FAR, Rabat',
       '1990-07-23',
       '2023-12-01'
    WHERE NOT EXISTS (SELECT 1
                  FROM customer
                  WHERE id = '123e4567-e89b-12d3-a456-426614174001');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174002',
       'Youssef El Amrani',
       'youssef.elamrani@gmail.com',
       'Boulevard Zerktouni, Casablanca',
       '1978-11-12',
       '2022-06-20'
    WHERE NOT EXISTS (SELECT 1
                  FROM customer
                  WHERE id = '123e4567-e89b-12d3-a456-426614174002');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174003',
       'Sanaa Chakir',
       'sanaa.chakir@gmail.com',
       'Avenue Hassan II, Fès',
       '1982-05-30',
       '2023-05-14'
    WHERE NOT EXISTS (SELECT 1
                  FROM customer
                  WHERE id = '123e4567-e89b-12d3-a456-426614174003');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174004',
       'Karim Tazi',
       'karim.tazi@gmail.com',
       'Rue de la Liberté, Tanger',
       '1995-09-05',
       '2024-03-01'
    WHERE NOT EXISTS (SELECT 1
                  FROM customer
                  WHERE id = '123e4567-e89b-12d3-a456-426614174004');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174005',
       'Nadia Benjelloun',
       'nadia.benjelloun@gmail.com',
       'Avenue des Nations Unies, Agadir',
       '1988-12-25',
       '2024-02-15'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174005');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174006',
       'Omar Berrada',
       'omar.berrada@gmail.com',
       'Boulevard Mohammed VI, Marrakech',
       '1992-04-18',
       '2023-08-25'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174006');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174007',
       'Salma Idrissi',
       'salma.idrissi@gmail.com',
       'Rue Allal Ben Abdellah, Rabat',
       '1975-08-11',
       '2022-10-10'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174007');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174008',
       'Hamza Lamrani',
       'hamza.lamrani@gmail.com',
       'Avenue Lalla Yacout, Casablanca',
       '1989-02-02',
       '2024-04-20'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174008');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174009',
       'Imane Fassi Fihri',
       'imane.fassifihri@gmail.com',
       'Place Jemaa el-Fna, Marrakech',
       '1993-06-15',
       '2023-06-30'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174009');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174010',
       'Rachid Chraibi',
       'rachid.chraibi@gmail.com',
       'Boulevard de la Résistance, Oujda',
       '1980-10-09',
       '2023-01-22'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174010');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174011',
       'Malika Sebbar',
       'malika.sebbar@gmail.com',
       'Rue Souika, Fès',
       '1984-01-03',
       '2024-05-12'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174011');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174012',
       'Mehdi Tsouli',
       'mehdi.tsouli@gmail.com',
       'Avenue Prince Moulay Abdellah, Tanger',
       '1991-11-25',
       '2022-11-11'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174012');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174013',
       'Zineb El Fassi',
       'zineb.elfassi@gmail.com',
       'Boulevard Bir Anzarane, Casablanca',
       '1976-07-08',
       '2023-09-19'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174013');

INSERT INTO customer (id, name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174014',
       'Amine Lazrak',
       'amine.lazrak@gmail.com',
       'Corniche Ain Diab, Casablanca',
       '1987-03-17',
       '2024-03-29'
    WHERE NOT EXISTS (SELECT 1 FROM customer WHERE id = '223e4567-e89b-12d3-a456-426614174014');