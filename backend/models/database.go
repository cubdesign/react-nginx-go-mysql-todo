package models

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"react-nginx-go-mysql-todo/config"
)

var Db *gorm.DB

func init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.Config.DbUser,
		config.Config.DbPassword,
		config.Config.DbHost,
		config.Config.DbPort,
		config.Config.DbName,
	)

	Db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("action: db Open, %s", err.Error())
	}
	err = Db.AutoMigrate(&User{}, &Todo{})
	if err != nil {
		log.Fatalf("action:db automigrate, err:%s", err.Error())
	}
}
