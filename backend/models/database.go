package models

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"react-nginx-go-mysql-todo/config"
	"time"
)

var Db *gorm.DB

func dbConnect(dialector gorm.Dialector, config gorm.Option, retryCount uint) (err error) {
	for retryCount > 1 {
		if Db, err = gorm.Open(dialector, config); err != nil {
			time.Sleep(time.Second * 2)
			retryCount--
			log.Printf("retry... count:%v\n", retryCount)
			continue
		}
		break
	}
	return err
}

func init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.Config.DbUser,
		config.Config.DbPassword,
		config.Config.DbHost,
		config.Config.DbName,
	)
	dialector := mysql.Open(dsn)
	config := &gorm.Config{}

	if err = dbConnect(dialector, config, 100); err != nil {
		log.Fatalf("action: db Open, %s", err.Error())
	}

	err = Db.AutoMigrate(&User{}, &Todo{})
	if err != nil {
		log.Fatalf("action:db automigrate, err:%s", err.Error())
	}
}
