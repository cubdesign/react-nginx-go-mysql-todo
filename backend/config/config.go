package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"strconv"
	"strings"
)

type ConfigList struct {
	LogFile string

	DbHost          string
	DbPort          int
	DbUser          string
	DbPassword      string
	DbName          string
	CORS            []string
	TRUSTED_PROXIES []string
}

var Config ConfigList

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("action: Load env file, err: %s", err.Error())
	}

	dbPort, _ := strconv.Atoi(os.Getenv("DB_PORT"))

	cors := strings.Split(os.Getenv("CORS"), ",")
	for i := range cors {
		cors[i] = strings.TrimSpace(cors[i])
	}

	log.Printf("CORS: %T, %v, %d", cors, cors, len(cors))

	trustedProxies := strings.Split(os.Getenv("TRUSTED_PROXIES"), ",")
	for i := range trustedProxies {
		trustedProxies[i] = strings.TrimSpace(trustedProxies[i])
	}

	log.Printf("TRUSTED_PROXIES: %T, %v, %d", trustedProxies, trustedProxies, len(trustedProxies))

	Config = ConfigList{

		LogFile: os.Getenv("LOG_FILE"),

		DbHost:          os.Getenv("DB_HOST"),
		DbPort:          dbPort,
		DbName:          os.Getenv("DB_NAME"),
		DbUser:          os.Getenv("DB_USER"),
		DbPassword:      os.Getenv("DB_PASSWORD"),
		CORS:            cors,
		TRUSTED_PROXIES: trustedProxies,
	}
}
