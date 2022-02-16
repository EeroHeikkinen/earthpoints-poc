SHELL:=/bin/bash

.PHONY: build
build:
	docker build -t registry.digitalocean.com/earthpoints/earthpoints-poc:latest .

.PHONY: login
login:
	doctl registry login --expiry-seconds 3600; \
	doctl kubernetes cluster kubeconfig save --expiry-seconds 3600 ffb1a5d5-e0c7-4553-87d2-db6633465a6d;

.PHONY: apply
apply:
	kubectl apply -f kuber.yml; \
	kubectl rollout status deployment/earthpoints-poc;

POD_NAME=$(shell kubectl get pods -o=name | grep earthpoints-poc- | sed 's/^.\{4\}//')

.PHONY: wipedb
wipedb:
	kubectl exec -it $(POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 -e "drop keyspace earthpoints"; \
    kubectl exec -it $(POD_NAME) -c cassandra -- cqlsh --request-timeout=3600 < src/database/schema/schema.cql;


.PHONY: log-app
log-app:
	kubectl logs -f $(POD_NAME) -c earthpoints-poc

.PHONY: log-db
log-db:
	kubectl logs -f $(POD_NAME) -c cassandra
