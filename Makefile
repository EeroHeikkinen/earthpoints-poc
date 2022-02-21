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
	kubectl delete secret earthpoints-poc-secret; \
	kubectl create secret generic earthpoints-poc-secret --from-env-file=secrets/.env.prod;

.PHONY: apply
apply:
	kubectl apply -f kuber.yml; \
	kubectl rollout status deployment/earthpoints-poc;

APP_POD_NAME=$(shell kubectl get pods -o=name | grep earthpoints-poc- | sed 's/^.\{4\}//')
DB_POD_NAME=$(shell kubectl get pods -o=name | grep cassandra- | sed 's/^.\{4\}//')

.PHONY: wipedb
wipedb:
	kubectl exec -it $(DB_POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 -e "drop keyspace earthpoints"; \
	kubectl exec -it $(DB_POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 < src/database/schema/schema.cql;
#	some example commands to execute cqlsh to copy-paste
#	kubectl exec -it $(kubectl get pods -o=name | grep cassandra- | sed 's/^.\{4\}//') -c cassandra -- cqlsh -e "select * from earthpoints.user"


.PHONY: log-app
log-app:
	kubectl logs -f $(APP_POD_NAME) -c earthpoints-poc

.PHONY: log-db
log-db:
	kubectl logs -f $(DB_POD_NAME) -c cassandra

.PHONY: restart
restart:
	kubectl rollout restart deployment/earthpoints-poc	
