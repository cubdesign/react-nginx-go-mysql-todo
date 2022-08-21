package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"strconv"
)

type ConfigList struct {
	LogFile string

	DbHost     string
	DbPort     int
	DbUser     string
	DbPassword string
	DbName     string
}

var Config ConfigList

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("action: Load env file, err: %s", err.Error())
	}

	dbPort, _ := strconv.Atoi(os.Getenv("DB_PORT"))

	Config = ConfigList{

		LogFile: os.Getenv("LOG_FILE"),

		DbHost:     os.Getenv("DB_HOST"),
		DbPort:     dbPort,
		DbName:     os.Getenv("DB_NAME"),
		DbUser:     os.Getenv("DB_USER"),
		DbPassword: os.Getenv("DB_PASSWORD"),
	}
}
