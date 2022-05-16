DROP KEYSPACE earthpoints;

CREATE KEYSPACE IF NOT EXISTS earthpoints
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

CREATE TABLE earthpoints.user (
   userid uuid PRIMARY KEY,
   first_name varchar,
   email varchar, /* will be deprecated */
   emails set<varchar>,
   timezone varchar,
   country_code varchar,
   created_at timestamp
);

CREATE TABLE earthpoints.sent_email (
   userid uuid,
   template varchar,
   timestamp timestamp,
   PRIMARY KEY ((userid,template))
);

CREATE TABLE earthpoints.email_content_template (
   key varchar,
   content varchar,
   subject varchar,
   PRIMARY KEY (key)
);

CREATE TABLE earthpoints.platform_connection (
   userid uuid,
   profile_id varchar,
   platform varchar,
   emails set<varchar>,
   auth_token varchar,
   token_secret varchar,
   auth_expiration timestamp,
   head timestamp,
   tail timestamp,
   watched_resources list<varchar>,
   PRIMARY KEY (userid,platform)
);

CREATE TABLE earthpoints.platform_connection_by_profile_id_and_platform (
   userid uuid,
   profile_id varchar,
   platform varchar,
   emails set<varchar>,
   auth_token varchar,
   token_secret varchar,
   auth_expiration timestamp,
   head timestamp,
   tail timestamp,
   watched_resources list<varchar>,
   PRIMARY KEY (profile_id,platform)
);

CREATE TABLE earthpoints.point_event (
   hash varchar,
   userid uuid,
   is_burn boolean,
   points double,
   priority int,
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
   priority int,
   timestamp timestamp,  
   platform varchar, 
   verb varchar,
   message varchar,
   icon varchar,
   metadata map<varchar, varchar>,
   PRIMARY KEY (userid,hash)
);

CREATE TABLE earthpoints.unsubscription (
   userid uuid PRIMARY KEY,
   templates set<varchar>,
   reason varchar,
   timestamp timestamp,
);

CREATE TABLE earthpoints.rule_instance (
   id uuid PRIMARY KEY,
   name varchar,
   template varchar,
   layers_json varchar,
   enabled boolean,
   options map<varchar, varchar>,
   filter map<varchar, varchar>
);

INSERT INTO earthpoints.rule_instance (id, name, template, options, layers_json) 
VALUES (now(), 'User posted with #SaveSoil', 'posted', 
{ 
   'points': '15',
   'hashtags': 'SaveSoil',
   'priority': '0',
   'message': 'You posted about soil! Well done!'
}, '[{"type":"FilterLayer","options":{"rules":{"condition":"AND","rules":[{"id":"content_type","field":"content_type","type":"integer","input":"select","operator":"equal","value":1,"flags":{"filter_readonly":true,"operator_readonly":true,"value_readonly":true,"no_delete":true}},{"id":"hashtags","field":"hashtags","type":"string","input":"text","operator":"contains","value":"#SaveSoil"}],"valid":true},"filters":[{"id":"platform","label":"Platform","type":"integer","input":"select","values":{"1":"Twitter","2":"Instagram","3":"Facebook"},"operators":["equal","not_equal","in","not_in","is_null","is_not_null"]},{"id":"hashtags","label":"Hashtags","type":"string"},{"id":"message","label":"Message","type":"string"},{"id":"content_type","label":"Content type","type":"integer","input":"select","values":{"1":"Post","2":"Share"},"operators":["equal"]}]}}]');


INSERT INTO earthpoints.rule_instance (id, name, template, options, layers_json) 
VALUES (now(), 'User shared content with #SaveSoil', 'shared', 
{ 
   'points': '10',
   'hashtags': 'SaveSoil',
   'priority': '0',
   'message': 'You shared #SaveSoil related content.'
}, '[{"type":"FilterLayer","options":{"rules":{"condition":"AND","rules":[{"id":"content_type","field":"content_type","type":"integer","input":"select","operator":"equal","value":2,"flags":{"filter_readonly":true,"operator_readonly":true,"value_readonly":true,"no_delete":true}},{"id":"hashtags","field":"hashtags","type":"string","input":"text","operator":"contains","value":"#SaveSoil"}],"valid":true},"filters":[{"id":"platform","label":"Platform","type":"integer","input":"select","values":{"1":"Twitter","2":"Instagram","3":"Facebook"},"operators":["equal","not_equal","in","not_in","is_null","is_not_null"]},{"id":"hashtags","label":"Hashtags","type":"string"},{"id":"message","label":"Message","type":"string"},{"id":"content_type","label":"Content type","type":"integer","input":"select","values":{"1":"Post","2":"Share"},"operators":["equal"]}]}}]');


INSERT INTO earthpoints.rule_instance (id, name, template, options, layers_json) 
VALUES (now(), 'User posted 5 times with #SaveSoil', 'postedNTimes', 
{ 
   'points': '5',
   'priority': '0',
   'message': 'You posted with #SaveSoil more than 5 times!'
}, '[{"type":"FilterLayer","options":{"rules":{"condition":"AND","rules":[{"id":"content_type","field":"content_type","type":"integer","input":"select","operator":"equal","value":1,"flags":{"filter_readonly":true,"operator_readonly":true,"value_readonly":true,"no_delete":true}}],"valid":true},"filters":[{"id":"platform","label":"Platform","type":"integer","input":"select","values":{"1":"Twitter","2":"Instagram","3":"Facebook"},"operators":["equal","not_equal","in","not_in","is_null","is_not_null"]},{"id":"hashtags","label":"Hashtags","type":"string"},{"id":"message","label":"Message","type":"string"},{"id":"content_type","label":"Content type","type":"integer","input":"select","values":{"1":"Post","2":"Share"},"operators":["equal"]}]}},{"type":"UserHistoryLayer","options":{"rules":{"condition":"AND","rules":[{"id":"content_type","field":"content_type","type":"integer","input":"select","operator":"equal","value":1,"flags":{"filter_readonly":true,"operator_readonly":true,"value_readonly":true,"no_delete":true}}],"valid":true},"filters":[{"id":"platform","label":"Platform","type":"integer","input":"select","values":{"1":"Twitter","2":"Instagram","3":"Facebook"},"operators":["equal","not_equal","in","not_in","is_null","is_not_null"]},{"id":"hashtags","label":"Hashtags","type":"string"},{"id":"message","label":"Message","type":"string"},{"id":"content_type","label":"Content type","type":"integer","input":"select","values":{"1":"Post","2":"Share"},"operators":["equal"]}]}},{"type":"FilterLayer","options":{"rules":{"condition":"AND","rules":[{"id":"match_count","field":"match_count","type":"integer","input":"number","operator":"greater_or_equal","value":5}],"valid":true},"filters":[{"id":"match_count","label":"Match count","type":"integer"}]}}]');