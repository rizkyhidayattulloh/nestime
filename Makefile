PROTO_DIR = ./src/app/grpc/gen-proto
PROTO_FILES = $(shell find ./proto -name "*.proto")

gen-proto:
	@echo "Deleting old proto files..."

	rm -rf $(PROTO_DIR)

	@echo "Make proto dir..."

	mkdir -p $(PROTO_DIR)

	@echo "Generating proto files..."

	protoc --proto_path=proto --plugin=./node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=./src/app/grpc/gen-proto \
			$(PROTO_FILES) \
		--ts_proto_opt=nestJs=true \
		--ts_proto_opt=esModuleInterop=true \
		--ts_proto_opt=addGrpcMetadata=true \
		--ts_proto_opt=fileSuffix=.pb \
		--ts_proto_opt=rpcErrorHandler=true \
		--ts_proto_opt=snakeToCamel=false \

	@echo "Proto files generated successfully"