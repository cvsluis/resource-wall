SELECT title, description, image, users.name AS owner_name
FROM pins
join users on pins.owner_id = users.id
WHERE title ILIKE '%search_term%';
