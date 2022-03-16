DROP TABLE IF EXISTS earthpoints.point_event_by_created_at;

CREATE TABLE earthpoints.point_event_by_created_at (
   hash varchar,
   userid uuid,
   is_burn boolean,
   points double,
   timestamp timestamp,  
   created_at timestamp,
   platform varchar,
   verb varchar,
   message varchar,
   icon varchar,
   metadata map<varchar, varchar>,
   PRIMARY KEY ((userid), created_at)
) WITH CLUSTERING ORDER BY (created_at DESC);

COPY earthpoints.point_event(hash, userid, is_burn, points, timestamp, created_at, platform, verb, message, icon, metadata) TO 'point-events.csv';
COPY earthpoints.point_event_by_created_at(hash, userid, is_burn, points, timestamp, created_at, platform, verb, message, icon, metadata) FROM 'point-events.csv';