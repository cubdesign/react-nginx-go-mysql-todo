package main

import (
	"react-nginx-go-mysql-todo/config"
	"react-nginx-go-mysql-todo/controllers"
	"react-nginx-go-mysql-todo/utils"
)

func main() {
	utils.LoggingSettings(config.Config.LogFile)
	controllers.StartWebserver()
}
