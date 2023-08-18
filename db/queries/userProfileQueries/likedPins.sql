SELECT pins.title, pins.description, pins.image, users.name AS owner_name
FROM pins
JOIN likes ON pins.id = likes.pin_id
JOIN users ON pins.owner_id = users.id
WHERE likes.owner_id = [user_id];