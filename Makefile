gen-proto:
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto\
		--ts_proto_out=./src/ proto/**/*.proto\
		--ts_proto_opt=nestJs=true\
		--ts_proto_opt=esModuleInterop=true\
		--ts_proto_opt=addGrpcMetadata=true\
		--ts_proto_opt=fileSuffix=.pb\
		--ts_proto_opt=rpcErrorHandler=true\