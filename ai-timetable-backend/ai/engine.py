import sys
import json
import random

data = json.loads(sys.stdin.read())

courses = data["courses"]
slots = data["slots"]
rooms = data["rooms"]

DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

result = []

if not courses or not slots or not rooms:
    print(json.dumps([]))
    sys.exit()

course_index = 0

for day in DAYS:
    for slot in slots:

        course = courses[course_index % len(courses)]
        room = random.choice(rooms)

        result.append({
            "day": day,
            "slot_id": str(slot["_id"]),
            "course_id": str(course["_id"]),
            "room_id": str(room["_id"]),
            "user_id": "Teacher"
        })

        course_index += 1

print(json.dumps(result))
