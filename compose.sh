#!/bin/zsh
if [ "$2" = "up" ];then
	if [ "$1" = "dev" ]; then
		echo "Start docker services in development mode"
		compose_file="./compose/docker-compose.dev.yml"
		output_file="./compose/initdb.dev.js"
		env_file="./envs/.dev.env"
		docker-compose --env-file $env_file  -f $compose_file up -d
	fi

	if [ "$1" = "test" ]; then
		echo "Start docker services in testing mode"
		compose_file="./compose/docker-compose.test.yml"
		output_file="./compose/initdb.test.js"
		env_file="./envs/.test.env"
		docker-compose --env-file $env_file  -f $compose_file up -d
	fi

	source $env_file
	echo "\
	db.createUser( \n\
			{ \n\
					user: \"$DATABASE_USER\", \n
					pwd: \"$DATABASE_PASSWORD\", \n\
					roles: [ \n\
							{ \n\
									role: \"readWrite\", \n\
									db: \"$DATABASE_DB\" \n\
							} \n\
					] \n\
			} \n\
	) \n\
	\n\
	" > $output_file
fi
