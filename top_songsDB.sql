DROP DATABASE IF EXISTS top_songsDB;

CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE top5000(
    position INT(4) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    song VARCHAR(255) NOT NULL,
    year INT(4) NOT NULL,
    raw_total DECIMAL(10,3),
    raw_usa DECIMAL(10,3),
    raw_uk DECIMAL(10,3),
    raw_eur DECIMAL(10,3),
    raw_row DECIMAL(10,3)
);

SELECT song FROM top5000 WHERE artist='U2';
SELECT artist, COUNT(*)>1 FROM top5000 GROUP BY artist HAVING COUNT(*)>1;
SELECT * FROM top5000 WHERE year BETWEEN 1980 and 1989;
SELECT * FROM top5000 WHERE song = 'Umbrella';