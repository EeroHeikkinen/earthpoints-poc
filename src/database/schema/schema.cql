CREATE KEYSPACE IF NOT EXISTS earthpoints
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

CREATE TABLE earthpoints.user (
   userid uuid PRIMARY KEY,
   first_name varchar
);

CREATE TABLE earthpoints.social_credential (
   userid uuid,
   profile_id varchar,
   platform varchar,
   auth_token varchar,
   token_secret varchar,
   auth_expiration timestamp,
   last_sync timestamp,
   watched_resources list<varchar>,
   PRIMARY KEY (userid,platform)
);

CREATE TABLE earthpoints.social_credential_by_profile_id_and_platform (
   userid uuid,
   profile_id varchar,
   platform varchar,
   auth_token varchar,
   auth_expiration timestamp,
   last_sync timestamp,
   watched_resources list<varchar>,
   PRIMARY KEY (profile_id,platform)
);

CREATE TABLE earthpoints.point_event (
   hash varchar,
   userid uuid,
   is_burn boolean,
   points double,
   timestamp timestamp,  
   platform varchar, 
   verb varchar,
   message varchar,
   icon varchar,
   metadata map<varchar, varchar>,
   PRIMARY KEY (hash)
);

CREATE TABLE earthpoints.point_event_by_userid (
   hash varchar,
   userid uuid,
   is_burn boolean,
   points double,
   timestamp timestamp,  
   platform varchar, 
   verb varchar,
   message varchar,
   icon varchar,
   metadata map<varchar, varchar>,
   PRIMARY KEY (userid,hash)
);

/*CREATE TABLE computation_rule (
   id uuid PRIMARY KEY,
   profile_id string,
   platform varchar,
   auth_token varchar,
   auth_expiration timestamp,
   last_sync timestamp
);*/