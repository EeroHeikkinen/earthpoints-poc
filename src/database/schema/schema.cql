CREATE TABLE user (
   userid uuid PRIMARY KEY,
   first_name varchar
);

CREATE TABLE earthpoints.social_credential (
   userid uuid,
   profile_id varchar,
   platform varchar,
   auth_token varchar,
   auth_expiration timestamp,
   last_sync timestamp,
   watched_resources list<varchar>,
   PRIMARY KEY (userid)
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


CREATE TABLE computation_rule (
   id uuid PRIMARY KEY,
   profile_id string,
   platform varchar,
   auth_token varchar,
   auth_expiration timestamp,
   last_sync timestamp
);
