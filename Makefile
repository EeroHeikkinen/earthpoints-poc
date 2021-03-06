SHELL:=/bin/bash

.PHONY: build
build:
	docker build --no-cache -t registry.digitalocean.com/earthpoints/earthpoints-poc:latest .

.PHONY: login
login:
	doctl registry login --expiry-seconds 3600; \
	doctl kubernetes cluster kubeconfig save --expiry-seconds 3600 ffb1a5d5-e0c7-4553-87d2-db6633465a6d;

.PHONY: savesecrets
savesecrets:
	kubectl delete secret -n=default earthpoints-poc-secret; \
	kubectl create secret generic earthpoints-poc-secret -n=default --from-env-file=secrets/.env.production;

.PHONY: savesecrets-uat
savesecrets-uat:
	kubectl delete secret -n=uat earthpoints-poc-secret; \
	kubectl create secret generic earthpoints-poc-secret -n=uat --from-env-file=secrets/.env.uat;


.PHONY: apply
apply:
	kubectl apply -n=default -f kuber.yml; \
	kubectl apply -n=default -f kuber-app-default.yml; \
	kubectl rollout status -n=default deployment/earthpoints-poc;

.PHONY: apply-uat
apply-uat:
	kubectl apply -n=uat -f kuber.yml; \
	kubectl apply -n=uat -f kuber-app-uat.yml; \
	kubectl rollout status -n=uat deployment/earthpoints-poc;

.PHONY: restart-app
restart-app:
	kubectl rollout restart deployment/earthpoints-poc	

.PHONY: restart-app-uat
restart-app-uat:
	kubectl rollout restart -n=uat deployment/earthpoints-poc	


#APP_POD_NAME=$(shell kubectl get pods -o=name | grep earthpoints-poc- | sed 's/^.\{4\}//')
DB_POD_NAME=$(shell kubectl get pods -o=name | grep cassandra- | sed 's/^.\{4\}//')
DB_POD_NAME_UAT=$(shell kubectl get pods -o=name -n=uat | grep cassandra- | sed 's/^.\{4\}//')

#.PHONY: wipedb
#wipedb:
#	kubectl exec -it $(DB_POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 -e "drop keyspace earthpoints"; \
#	kubectl exec -it $(DB_POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 < src/database/schema/schema.cql;
#	some example commands to execute cqlsh to copy-paste
#	kubectl exec -it $(kubectl get pods -o=name | grep cassandra- | sed 's/^.\{4\}//') -c cassandra -- cqlsh -e "select * from earthpoints.user"


.PHONY: log-app
log-app:
	kubectl logs -f $(pod_name) -c earthpoints-poc --tail=10

.PHONY: log-db
log-db:
	kubectl logs -f $(DB_POD_NAME) -c cassandra

.PHONY: log-db-uat
log-db-uat:
	kubectl logs -n=uat -f $(DB_POD_NAME_UAT) -c cassandra

.PHONY: connect-db
connect-db:
	kubectl exec -it $(DB_POD_NAME) -- bash
	
.PHONY: connect-db-uat
connect-db-uat:
	kubectl exec -n=uat -it $(DB_POD_NAME_UAT) -- bash

## We have executed these commands once. No need to execute again. 
## They are here for future references...
#.PHONY: backup
#backup:
#	kubectl create -f kuber-snapshot.yml

#.PHONY: backup-uat
#backup-uat:
#	kubectl create -n=uat -f kuber-snapshot.yml