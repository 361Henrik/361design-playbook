UPDATE voice_tokens SET
  name = 'No Oxford comma',
  description = 'In lists of three or more items, do not use a comma before "and". This reflects a more natural, European editorial tone.',
  dos = ARRAY['Colors, typography and spacing', 'Red, green and blue', 'Culture, heritage and landscape'],
  donts = ARRAY['Colors, typography, and spacing', 'Red, green, and blue', 'Culture, heritage, and landscape']
WHERE id = '91d45982-dc6d-49fc-852f-91575b3b64c6';