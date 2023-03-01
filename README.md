# UKD Schedule API
## This reverse server for serialization data to JSON.

### Requires Node.js version ^18 to work

## API routes:
```bash
# get a list of group names
GET: /api/groups

# get a list of teacher names
GET: /api/teachers

# get the schedule with query:
# * group   - group name in string
#   startAt - date in string
#   endAt   - date in string
#   teacher - teacher's name in string
GET: /api/schedules
```
## Running in Docker:
```bash
# start docker container
$ docker run -p 7000:7000 ukd-schedule--api
```





