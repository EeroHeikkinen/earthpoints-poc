ALTER TABLE earthpoints.point_event ADD created_at timestamp;
ALTER TABLE earthpoints.point_event_by_userid ADD created_at timestamp;
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
) WITH CLUSTERING ORDER BY (created_at DESC) IF NOT EXISTS;

COPY earthpoints.point_event(hash, userid, is_burn, points, timestamp, created_at, platform, verb, message, icon, metadata) TO 'point-events.csv' WITH NULL='2022-03-17T00:00:00.000Z';
COPY earthpoints.point_event_by_created_at(hash, userid, is_burn, points, timestamp, created_at, platform, verb, message, icon, metadata) FROM 'point-events.csv';