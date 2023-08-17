SELECT pins.*, AVG(ratings.rating) AS average_rating, ARRAY_AGG(comments.description) AS comments_list
FROM pins
LEFT JOIN ratings ON pins.id = ratings.pin_id
LEFT JOIN comments ON pins.id = comments.pin_id
WHERE pins.id = [pin_id]
GROUP BY pins.id;